package com.threefish.semahi.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by reza on 11/13/16.
 */
@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String writer;
    private String title;
    private String lead;
    @OneToOne
    @JoinColumn(name = "mainPicId")
    private Picture mainPic;
    private String body;
    private Date date;
    @OneToOne
    @JoinColumn(name = "mainPictureId")
    private Picture mainPicture;

    public String getBody() {
        return body;
    }

    public void getBody(String body) {
        this.body = body;
    }

    public Picture getMainPicture() {
        return mainPicture;
    }

    public void setMainPicture(Picture mainPicture) {
        this.mainPicture = mainPicture;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;

    }

    public String getLead() {
        return lead;
    }

    public void setLead(String lead) {
        this.lead = lead;
    }
}
