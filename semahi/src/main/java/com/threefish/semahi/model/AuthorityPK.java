package com.threefish.semahi.model;

import java.io.Serializable;

/**
 * User: alireza ghassemi
 */

@SuppressWarnings("unused")
public class AuthorityPK implements Serializable {
    private String username;
    private String authority;

    public AuthorityPK(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }

    public AuthorityPK() {
    }
}
