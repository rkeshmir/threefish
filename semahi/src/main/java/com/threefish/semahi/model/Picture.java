package com.threefish.semahi.model;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;

/**
 * Created by reza on 11/13/16.
 */
@Entity
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long contentId;
    @JsonIgnore
    private byte[] data;
    private String label;
    private String type;
    private String format;
    private Boolean published;
    @Transient
    private String url;

    public Picture(byte[] data, String label, String type, String fileName) throws ParseException {
        this.data = data;
        this.label = label;
        this.type = type;
        this.published = false;
        this.format = extractFormat(fileName);
    }

    public Picture(Long contentId, byte[] data, String label, String type, String fileNameOrFormat) throws ParseException {
        this.contentId = contentId;
        this.data = data;
        this.label = label;
        this.type = type;
        this.published = false;
        this.format = extractFormat(fileNameOrFormat);
    }

    public Picture(){

    }

    private String extractFormat(String fileNameOrFormat) throws ParseException {
        if (fileNameOrFormat == null)
            throw new ParseException("Unknown file format", 0);
        fileNameOrFormat = fileNameOrFormat.toLowerCase();
        if (fileNameOrFormat.equals("jpg") || fileNameOrFormat.equals("jpeg"))
            return "jpg";
        else if (fileNameOrFormat.equals("png") || fileNameOrFormat.equals("tiff") ||
                fileNameOrFormat.equals("gif") || fileNameOrFormat.equals("bmp"))
            return fileNameOrFormat;

        if (fileNameOrFormat.endsWith(".jpg") || fileNameOrFormat.endsWith(".jpeg"))
            return "jpg";
        else if (fileNameOrFormat.endsWith(".png"))
            return "png";
        else if (fileNameOrFormat.endsWith(".tiff"))
            return "tiff";
        else if (fileNameOrFormat.endsWith(".gif"))
            return "gif";
        else if (fileNameOrFormat.endsWith(".bmp"))
            return "bmp";
        else
            throw new ParseException("Unknown file format", 0);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
//        String format = this.format != null ? this.format : "jpg";
        String format = "jpg";
        if (this.id != null) {
            String url = "picture/" + this.id + "/pic";
            if (this.contentId != null)
                url += this.contentId + "_";
            if (this.type != null)
                url += this.type + "_";
            url += this.id + "." + format;
            return url;
        }
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) throws ParseException {
        this.format = extractFormat(format);
    }

    @Transient
    public int getWidth() {
        if (this.getData() == null)
            return -1;
        try {
            InputStream in = new ByteArrayInputStream(this.getData());
            BufferedImage image = ImageIO.read(in);
            return image.getWidth();
        } catch (IOException e) {
            return 0;
        }
    }

    @Transient
    public int getHeight() {
        if (this.getData() == null)
            return -1;
        try {
            InputStream in = new ByteArrayInputStream(this.getData());
            BufferedImage image = ImageIO.read(in);
            return image.getHeight();
        } catch (IOException e) {
            return 0;
        }
    }
}
