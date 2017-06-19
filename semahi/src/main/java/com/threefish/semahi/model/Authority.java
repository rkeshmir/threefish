package com.threefish.semahi.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

/**
 * Created by reza on 11/12/16.
 */
@Entity
@IdClass(AuthorityPK.class)
@Table(name = "authorities")
public class Authority implements GrantedAuthority {
    @Id
    private String authority;
    @Id
    private String username;

    public Authority(String authority, String username) {
        this.authority = authority;
        this.username = username;
    }

    public Authority() {
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
