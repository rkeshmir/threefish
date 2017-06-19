package com.threefish.semahi.conf;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.sql.DataSource;

/**
 * Created by reza on 11/12/16.
 */
@Configuration
public class SecurityConf extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource datasource;


    // Register HttpSessionEventPublisher
    @Bean
    public static ServletListenerRegistrationBean httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
//                 .antMatchers(HttpMethod.POST, "/users/").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/**").permitAll()
                .antMatchers("/swagger*").permitAll()
                //.anyRequest().permitAll()
                //.and().csrf().disable();
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().formLogin().successHandler(restAuthenticationSuccessHandler()).failureHandler(restAuthenticationFailureHandler())
                .and().logout().logoutSuccessHandler(restLogoutSuccessHandler())
                .and().exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint())
                .and().csrf().disable().cors() //TODO enable csrf when we are ready
                .and().sessionManagement().maximumSessions(10).maxSessionsPreventsLogin(true).sessionRegistry(sessionRegistry());
        http.headers().cacheControl().disable()
                .addHeaderWriter(new StaticHeadersWriter("WWW-Authenticate","xBasic realm=\"fake\""));
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        SessionRegistry sessionRegistry = new SessionRegistryImpl();
        return sessionRegistry;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("PUT", "POST", "GET", "DELETE", "HEAD");
            }
        };
    }

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) throws Exception {
        /*auth
                .jdbcAuthentication().usersByUsernameQuery("Select username,password, 'true' as enabled from Users where username=?")
                .authoritiesByUsernameQuery("select username, authority from authorities where username=?")
                .dataSource(datasource).passwordEncoder(new BCryptPasswordEncoder());*/
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public AuthenticationFailureHandler restAuthenticationFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler();
    }

    @Bean
    public AuthenticationSuccessHandler restAuthenticationSuccessHandler() {
        return new RESTAuthenticationSuccessHandler();
    }

    @Bean
    public LogoutSuccessHandler restLogoutSuccessHandler() {
        return new RESTLogoutSuccessHandler();
    }
}
