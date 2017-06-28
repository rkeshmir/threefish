package com.threefish.semahi.model;

import javax.persistence.*;

/**
 * Created by r.kashmir on 6/28/2017.
 */
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @OneToOne
    @JoinColumn(name = "logoOutId")
    private Picture logoOut;
    @OneToOne
    @JoinColumn(name = "logoAnimatedInId")
    private Picture logoAnimatedIn;
    @OneToOne
    @JoinColumn(name = "logoInId")
    private Picture logoIn;
    @OneToOne
    @JoinColumn(name = "logoAnimatedOutId")
    private Picture logoAnimatedOut;
    @OneToOne
    @JoinColumn(name = "mainPicId")
    private Picture mainPic;
    private String shortDescription;
    private Boolean active;
    private Integer seenCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Picture getLogoOut() {
        return logoOut;
    }

    public void setLogoOut(Picture logoOut) {
        this.logoOut = logoOut;
    }

    public Picture getLogoAnimatedIn() {
        return logoAnimatedIn;
    }

    public void setLogoAnimatedIn(Picture logoAnimatedIn) {
        this.logoAnimatedIn = logoAnimatedIn;
    }

    public Picture getLogoIn() {
        return logoIn;
    }

    public void setLogoIn(Picture logoIn) {
        this.logoIn = logoIn;
    }

    public Picture getLogoAnimatedOut() {
        return logoAnimatedOut;
    }

    public void setLogoAnimatedOut(Picture logoAnimatedOut) {
        this.logoAnimatedOut = logoAnimatedOut;
    }

    public Picture getMainPic() {
        return mainPic;
    }

    public void setMainPic(Picture mainPic) {
        this.mainPic = mainPic;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getSeenCount() {
        return seenCount;
    }

    public void setSeenCount(Integer seenCount) {
        this.seenCount = seenCount;
    }

    public Integer increaseSeenCount() {
        if (this.seenCount == null)
            this.seenCount = 0;
        seenCount++;
        return seenCount;
    }
}
