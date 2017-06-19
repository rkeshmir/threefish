package com.threefish.semahi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by reza on 11/14/16.
 */
@Entity
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long applicationId;
    @JsonIgnore
    private byte[] data;
    private String description;
    private String name;
    private Date registrationDate;
    private Long size;
    private String version;
    private String minimumAndroidVersion;
    @Transient
    private String url;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getMinimumAndroidVersion() {
        return minimumAndroidVersion;
    }

    public void setMinimumAndroidVersion(String minimumAndroidVersion) {
        this.minimumAndroidVersion = minimumAndroidVersion;
    }

    public String getUrl() {
        if (this.id != null)
            return "file/" + this.id + "/" + this.name + ".apk";
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
