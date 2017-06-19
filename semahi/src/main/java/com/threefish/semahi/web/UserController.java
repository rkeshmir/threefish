package com.threefish.semahi.web;

import com.threefish.semahi.model.Role;
import com.threefish.semahi.model.User;
import com.threefish.semahi.repo.*;
import com.threefish.semahi.service.UserDetailManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by reza on 11/12/16.
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserDetailManager userDetailManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    @Autowired
    public UserController(UserDetailManager userDetailManager, UserRepository userRepository,
                          RoleRepository roleRepository,
                          SessionRegistry sessionRegistry
    ) {
        this.userDetailManager = userDetailManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sessionRegistry = sessionRegistry;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createUser(@RequestBody User user) {
        if (user.getUsername() == null)
            user.setUsername(user.getMobilePhone());
        if (userDetailManager.loadUserByUsername(user.getUsername()) != null)
            throw new DuplicateKeyException("Redundant username");
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        userDetailManager.createUser(user);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.GET)
    public Page<User> getUsers(Pageable pageable, String username, String name, String family, Boolean enabled, String address,
                               String email, String phone, String postalCode, String authority) {

        Page<User> userPage = userRepository.findAll(new UserSpec(username, name, family, enabled, address,
                email, phone, postalCode, authority), pageable);
        for (User user : userPage.getContent()) {
            user.setLoggedIn(isLoggedIn(user));
        }

        return userPage;
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.GET, value = "/all")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public User getUserByUsername(@PathVariable String username) {
        User user = (User) userDetailManager.loadUserByUsername(username);
        if (user == null) throw new EmptyResultDataAccessException(1);
        user.setPassword(null);
        return user;
    }

    @PreAuthorize("authenticated")
    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public User getLoggedInUser(Authentication authentication) throws NotFoundException {
        User user = (User) userDetailManager.loadUserByUsername(authentication.getName());
        if (user == null)
            throw new NotFoundException();
        return user;
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public Iterable<Role> getRoles() {
        return roleRepository.findAll();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/authorities", method = RequestMethod.GET)
    public Iterable<Role> getAuthorities() {
        return roleRepository.findAll();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.PUT)
    public User updateUser(@RequestBody User user) {
        User theUser = (User) userDetailManager.loadUserByUsername(user.getUsername());
        if (theUser == null) throw new EmptyResultDataAccessException(1);
        user.setPassword(theUser.getPassword());
        userDetailManager.updateUser(user);
        return user;
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/resetPassword", method = RequestMethod.PUT)
    public User resetPassword(@RequestBody String newPassword, String username) {
        User user = (User) userDetailManager.loadUserByUsername(username);
        if (user == null) throw new EmptyResultDataAccessException(1);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userDetailManager.updateUser(user);
        return user;
    }

    @RequestMapping(value = "/enable", method = RequestMethod.PUT)
    public User enableUser(String username) {
        return (User) userDetailManager.enableUser(username);
    }

    @RequestMapping(value = "/disable", method = RequestMethod.PUT)
    public User disableUser(String username) {
        return (User) userDetailManager.disableUser(username);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public void deleteUserByUsername(@PathVariable String username) {
        userDetailManager.deleteUser(username);
    }


    @PreAuthorize("hasAnyAuthority('admin')")
    @RequestMapping(value = "/getAllPrincipals", method = RequestMethod.GET)
    public List<String> getAllPrincipals() {
        List<Object> principals = sessionRegistry.getAllPrincipals();
        List<String> usersNamesList = new ArrayList<>();

        for (Object principal : principals) {
            if (principal instanceof User) {
                usersNamesList.add(((User) principal).getUsername());
            }
        }
        return usersNamesList;
    }

    @PreAuthorize("hasAnyAuthority('admin')")
    @RequestMapping(value = "/getAllSessions/{username}", method = RequestMethod.GET)
    public List<SessionInformation> getAllSessions(@PathVariable String username) {
        logger.info("Request user sessions for " + username);
        return sessionRegistry.getAllSessions(userDetailManager.loadUserByUsername(username), true);
    }

    private Boolean isLoggedIn(User user) {
        List<String> principals = getAllPrincipals();
        return principals.contains(user.getUsername());
    }


}
