package com.threefish.semahi.web;

import com.threefish.semahi.model.Picture;
import com.threefish.semahi.repo.PictureRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;

/**
 * Created by reza on 11/13/16.
 */
@RestController
@RequestMapping("/picture")
public class PictureController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final PictureRepository pictureRepository;

    @Autowired
    public PictureController(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "multipart/*")
    public void save(MultipartFile file, String label, String type) throws IOException, ParseException {
        Picture picture = new Picture(file.getBytes(), label, type, file.getOriginalFilename());
        pictureRepository.save(picture);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Picture get(@PathVariable Long id) {
        return pictureRepository.findOne(id);
    }

    @ResponseBody
    @RequestMapping(value = {"/{id}/*.jpg", "/{id}/*.png"}, method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] picture(@PathVariable Long id, Integer height, Integer width) throws IOException {

        if (width != null && height != null) {
            Picture picture = pictureRepository.findOne(id);
            String format = picture.getFormat() != null ? picture.getFormat() : "png";

            // convert byte array back to BufferedImage
            InputStream in = new ByteArrayInputStream(picture.getData());
            BufferedImage originalImage = ImageIO.read(in);
            logger.info("image type: " + originalImage.getType());

            // resize
            BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR/*BufferedImage.TYPE_INT_ARGB*/);
            Graphics2D g = resizedImage.createGraphics();
            g.drawImage(originalImage, 0, 0, width, height, null);
            g.dispose();


            // to byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, format, baos);
            baos.flush();
            byte[] imageInByte = baos.toByteArray();
            baos.close();
            return imageInByte;
        }
        return pictureRepository.findOne(id).getData();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Picture update(@RequestBody Picture picture) {
        Picture orgPic = pictureRepository.findOne(picture.getId());
        orgPic.setLabel(picture.getLabel());
        orgPic.setType(picture.getType());
        return pictureRepository.save(orgPic);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        pictureRepository.delete(id);
    }
}
