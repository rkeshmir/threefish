package com.threefish.semahi.repo;

import com.threefish.semahi.model.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Created by rkesh on 6/6/2017.
 */
public class UserSpec implements Specification<User> {

    private String username;
    private String name;
    private String family;
    private Boolean enabled;
    private String address;
    private String email;
    private String phone;
    private String postalCode;

    private String authority;

    public UserSpec(String username, String name, String family, Boolean enabled, String address,
                    String email, String phone, String postalCode, String authority) {
        this.username = username;
        this.name = name;
        this.family = family;
        this.enabled = enabled;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.postalCode = postalCode;
        this.authority = authority;
    }

    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        Predicate result = null;
        if (username != null) {
            result = cb.like(root.get("username"), "%" + username + "%");
        }
        if (name != null) {
            result = result == null ? cb.like(root.get("name"), "%" + name + "%") :
                    cb.and(result, cb.like(root.get("name"), "%" + name + "%"));
        }
        if (family != null) {
            result = result == null ? cb.like(root.get("family"), "%" + family + "%") :
                    cb.and(result, cb.like(root.get("family"), "%" + family + "%"));
        }
        if (enabled != null) {
            result = result == null ? cb.equal(root.get("enabled"), enabled) :
                    cb.and(result, cb.equal(root.get("enabled"), enabled));
        }
        if (address != null) {
            result = result == null ? cb.like(root.get("address"), "%" + address + "%") :
                    cb.and(result, cb.like(root.get("address"), "%" + address + "%"));
        }
        if (email != null) {
            result = result == null ? cb.like(root.get("email"), "%" + email + "%") :
                    cb.and(result, cb.like(root.get("email"), "%" + email + "%"));
        }
        if (phone != null) {
            Predicate resultPhone = cb.like(root.get("phone"), "%" + phone + "%");
            resultPhone = cb.or(resultPhone, cb.like(root.get("mobilePhone"), "%" + phone + "%"));
            resultPhone = cb.or(resultPhone, cb.like(root.get("mobilePhoneTwo"), "%" + phone + "%"));
            resultPhone = cb.or(resultPhone, cb.like(root.get("mobilePhoneThree"), "%" + phone + "%"));

            result = result == null ? resultPhone :
                    cb.and(result, resultPhone);
        }
        if (postalCode != null) {
            result = result == null ? cb.like(root.get("postalCode"), "%" + postalCode + "%") :
                    cb.and(result, cb.like(root.get("postalCode"), "%" + postalCode + "%"));
        }
       /* if(authority != null) {
            Path<Authority> user = root.<Authority> get("username");
            Predicate resultAuth = cb.equal(user, authority);

        }*/

        return result;
    }
}
