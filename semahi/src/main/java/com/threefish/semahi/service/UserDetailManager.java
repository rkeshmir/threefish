package com.threefish.semahi.service;


import com.threefish.semahi.model.User;
import com.threefish.semahi.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

/**
 * Created by reza on 11/12/16.
 */
@Component
public class UserDetailManager implements UserDetailsManager {
    private final UserRepository userRepository;

    @Autowired
    public UserDetailManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void createUser(UserDetails user) {
        User theUser = (User) user;
        if (this.loadUserByUsername(user.getUsername()) == null)
            userRepository.save(theUser);
    }

    @Override
    public void updateUser(UserDetails user) {
        User theUser = (User) user;
        userRepository.save(theUser);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        userRepository.delete(username);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {

    }

    @Override
    public boolean userExists(String username) {
        return userRepository.findOne(username) != null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User one = userRepository.findOne(username);
        return one;
    }

    public Long count() {
        return userRepository.count();
    }

    public UserDetails enableUser(String username) {
        User user = (User) loadUserByUsername(username);
        user.setEnabled(true);
        return userRepository.save(user);
    }

    public UserDetails disableUser(String username) {
        User user = (User) loadUserByUsername(username);
        user.setEnabled(false);
        return userRepository.save(user);
    }

    public boolean hasAuthority(User user, String authority) {
        for (GrantedAuthority auth : user.getAuthorities()) {
            if (auth.getAuthority().equals(authority))
                return true;
        }
        return false;
    }

    public boolean hasAuthorities(User user, Iterable<String> authorities) {
        for (String auth : authorities) {
            if (hasAuthority(user, auth))
                return true;
        }
        return false;
    }


}
