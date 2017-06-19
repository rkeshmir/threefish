package com.threefish.semahi.model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by reza on 11/16/16.
 */
@Entity
public class Role {
    @Id
    private String authority;
    private String caption;

    public Role(String authority, String caption) {
        this.authority = authority;
        this.caption = caption;
    }

    public Role() {
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}
