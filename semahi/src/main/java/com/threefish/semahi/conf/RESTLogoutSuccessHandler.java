package com.threefish.semahi.conf;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by reza on 11/12/16.
 */
public class RESTLogoutSuccessHandler implements LogoutSuccessHandler {

//    private final EventRepository eventRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    public RESTLogoutSuccessHandler(EventRepository eventRepository) {
//        this.eventRepository = eventRepository;
//    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
//        Event event = new Event("Logout", authentication.getName(), request.getRemoteAddr(), request.getRemoteHost(),
//                request.getRequestedSessionId(),request.getHeader("Cookie"), request.getMethod(), Event.getParams(request), Event.getBody(request), request.getHeader("User-Agent"), request.getServletPath() );
//        event = eventRepository.save(event);
//        logger.info("Logout event created with id " + event.getId());
        logger.info(authentication.getName() + " signed out");
    }


}
