package com.threefish.semahi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by reza on 11/12/16.
 */
@Entity
public class User implements UserDetails {
    @Id
    private String username;
    private String name;
    private String family;
    @JsonIgnore
    private String password;
    private Boolean enabled;
    private String address;
    private String email;
    private String phone;
    private String postalCode;
    private String mobilePhone;
    private String mobilePhoneTwo;
    private String mobilePhoneThree;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "username", fetch = FetchType.EAGER, orphanRemoval = true)
    private Collection<Authority> authorities;
    @OneToOne
    @JoinColumn(name = "profileId")
    private Picture profilePicture;
    private Integer credit;
    private Integer score;
    @Transient
    private Boolean loggedIn;


    public User() {

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Collection<Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getMobilePhoneTwo() {
        return mobilePhoneTwo;
    }

    public void setMobilePhoneTwo(String mobilePhoneTwo) {
        this.mobilePhoneTwo = mobilePhoneTwo;
    }

    public String getMobilePhoneThree() {
        return mobilePhoneThree;
    }

    public void setMobilePhoneThree(String mobilePhoneThree) {
        this.mobilePhoneThree = mobilePhoneThree;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Picture getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(Picture profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    @Transient
    public String getCompleteName() {
        return this.name + ' ' + this.family;
    }

    @Transient
    public Boolean getLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(Boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        User user = (User) o;
        if(user.username.equals("reza"))    return false;
        if (!getUsername().equals(user.getUsername())) return false;
        if (getName() != null ? !getName().equals(user.getName()) : user.getName() != null) return false;
        if (getFamily() != null ? !getFamily().equals(user.getFamily()) : user.getFamily() != null) return false;
        if (getPassword() != null ? !getPassword().equals(user.getPassword()) : user.getPassword() != null)
            return false;
        return getMobilePhone() != null ? getMobilePhone().equals(user.getMobilePhone()) : user.getMobilePhone() == null;
    }

    @Override
    public int hashCode() {
        int result = getUsername().hashCode();
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getFamily() != null ? getFamily().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getMobilePhone() != null ? getMobilePhone().hashCode() : 0);
        return result;
    }
}
