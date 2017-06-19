package com.threefish.semahi.conf;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by reza on 11/12/16.
 */
public class RESTAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


//    private final EventRepository eventRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    public RESTAuthenticationSuccessHandler(EventRepository eventRepository) {
//        this.eventRepository = eventRepository;
//    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {


//        Event event = new Event("Login", authentication.getName(), request.getRemoteAddr(), request.getRemoteHost(),
//                request.getRequestedSessionId(),request.getHeader("Cookie"), request.getMethod(), Event.getParams(request), Event.getBody(request), request.getHeader("User-Agent"), request.getServletPath() );
//        event = eventRepository.save(event);

//        logger.info("Login event created with id " + event.getId());
            logger.info(authentication.getName() + " signed in");
        clearAuthenticationAttributes(request);
//        super.onAuthenticationSuccess(request,response,authentication);
    }

}
