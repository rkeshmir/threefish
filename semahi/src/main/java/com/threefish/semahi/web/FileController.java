package com.threefish.semahi.web;

import com.threefish.semahi.model.File;
import com.threefish.semahi.repo.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Created by reza on 11/14/16.
 */
@RestController
@RequestMapping("/file")
public class FileController {
    private final FileRepository fileRepository;


    @Autowired
    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;

    }


    @PreAuthorize("hasAuthority('admin')")
    @ResponseBody
    @RequestMapping(value = "/{id}/*.apk", method = RequestMethod.GET)
    public byte[] file(@PathVariable Long id) {
        return fileRepository.findOne(id).getData();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public File updateFile(@RequestBody File uFile) {
        File file = fileRepository.findOne(uFile.getId());
        file.setVersion(uFile.getVersion());
        file.setDescription(uFile.getDescription());
        return fileRepository.save(file);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteFile(@PathVariable Long id) {
        fileRepository.delete(id);
    }
}
