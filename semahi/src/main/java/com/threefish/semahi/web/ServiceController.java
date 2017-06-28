package com.threefish.semahi.web;

import com.threefish.semahi.model.Picture;
import com.threefish.semahi.model.Service;
import com.threefish.semahi.repo.PictureRepository;
import com.threefish.semahi.repo.ServiceRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;


/**
 * Created by r.kashmir on 6/28/2017.
 */
@RestController
@RequestMapping("/service")
public class ServiceController {
    private final ServiceRepository serviceRepository;
    private final PictureRepository pictureRepository;

    @Autowired
    public ServiceController(ServiceRepository serviceRepository, PictureRepository pictureRepository) {
        this.serviceRepository = serviceRepository;
        this.pictureRepository = pictureRepository;
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.POST)
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Service readService(@PathVariable Long id, Boolean manage, Authentication authentication) throws NotFoundException {
        if (manage == null)
            manage = false;
        Service service = serviceRepository.findOne(id);
        if (service == null)
            throw new NotFoundException("Service not found!");
        if (!manage) {
            if (authentication == null)
                throw new AuthorizationServiceException("You can not manage this service!");
            service.increaseSeenCount();
        }
        return serviceRepository.save(service);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Page<Service> readAllService(Pageable pageable) {
        return serviceRepository.findAll(pageable);
    }

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public Iterable<Service> readAllActiveService() {
        return serviceRepository.findAllByActiveTrue();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(method = RequestMethod.PUT)
    public Service updateService(@RequestBody Service service) throws NotFoundException {
        if (serviceRepository.findOne(service.getId()) == null) {
            throw new NotFoundException("Service not found!");
        }
        return serviceRepository.save(service);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteService(@PathVariable Long id) throws NotFoundException {
        if (serviceRepository.findOne(id) == null) {
            throw new NotFoundException("Service not found!");
        }
        serviceRepository.delete(id);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/logoOut", method = RequestMethod.POST, consumes = "multipart/*")
    public Picture saveLogoOut(@PathVariable Long id, MultipartFile file) throws IOException, ParseException {
        Service service = serviceRepository.findOne(id);
        if (service.getLogoOut() == null) {
            Picture picture = new Picture(file.getBytes(), service.getTitle(), "logoOut", file.getOriginalFilename());
            picture = pictureRepository.save(picture);
            service.setLogoOut(picture);
            serviceRepository.save(service);
            return picture;
        } else {
            Picture picture = service.getLogoOut();
            picture.setData(file.getBytes());
            return pictureRepository.save(picture);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/logoAnimatedIn", method = RequestMethod.POST, consumes = "multipart/*")
    public Picture saveLogoAnimatedIn(@PathVariable Long id, MultipartFile file) throws IOException, ParseException {
        Service service = serviceRepository.findOne(id);
        if (service.getLogoAnimatedIn() == null) {
            Picture picture = new Picture(file.getBytes(), service.getTitle(), "logoOut", file.getOriginalFilename());
            picture = pictureRepository.save(picture);
            service.setLogoAnimatedIn(picture);
            serviceRepository.save(service);
            return picture;
        } else {
            Picture picture = service.getLogoAnimatedIn();
            picture.setData(file.getBytes());
            return pictureRepository.save(picture);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/logoIn", method = RequestMethod.POST, consumes = "multipart/*")
    public Picture saveLogoIn(@PathVariable Long id, MultipartFile file) throws IOException, ParseException {
        Service service = serviceRepository.findOne(id);
        if (service.getLogoIn() == null) {
            Picture picture = new Picture(file.getBytes(), service.getTitle(), "logoOut", file.getOriginalFilename());
            picture = pictureRepository.save(picture);
            service.setLogoIn(picture);
            serviceRepository.save(service);
            return picture;
        } else {
            Picture picture = service.getLogoIn();
            picture.setData(file.getBytes());
            return pictureRepository.save(picture);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/logoAnimatedOut", method = RequestMethod.POST, consumes = "multipart/*")
    public Picture saveLogoAnimatedOut(@PathVariable Long id, MultipartFile file) throws IOException, ParseException {
        Service service = serviceRepository.findOne(id);
        if (service.getLogoAnimatedOut() == null) {
            Picture picture = new Picture(file.getBytes(), service.getTitle(), "logoOut", file.getOriginalFilename());
            picture = pictureRepository.save(picture);
            service.setLogoAnimatedOut(picture);
            serviceRepository.save(service);
            return picture;
        } else {
            Picture picture = service.getLogoAnimatedOut();
            picture.setData(file.getBytes());
            return pictureRepository.save(picture);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/mainPic", method = RequestMethod.POST, consumes = "multipart/*")
    public Picture saveMainPic(@PathVariable Long id, MultipartFile file) throws IOException, ParseException {
        Service service = serviceRepository.findOne(id);
        if (service.getMainPic() == null) {
            Picture picture = new Picture(file.getBytes(), service.getTitle(), "logoOut", file.getOriginalFilename());
            picture = pictureRepository.save(picture);
            service.setMainPic(picture);
            serviceRepository.save(service);
            return picture;
        } else {
            Picture picture = service.getMainPic();
            picture.setData(file.getBytes());
            return pictureRepository.save(picture);
        }
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/active", method = RequestMethod.PUT)
    public Boolean activateService(@PathVariable Long id) throws NotFoundException {
        Service service = serviceRepository.findOne(id);
        if (service == null)
            throw new NotFoundException("Service not found!");
        service.setActive(true);
        return (serviceRepository.save(service)).getActive();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/{id}/deactivate", method = RequestMethod.PUT)
    public Boolean deactivateService(@PathVariable Long id) throws NotFoundException {
        Service service = serviceRepository.findOne(id);
        if (service == null)
            throw new NotFoundException("Service not found!");
        service.setActive(false);
        return (serviceRepository.save(service)).getActive();
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/reorder", method = RequestMethod.PUT)
    private void reorder() {
        Sort sort = new Sort(Sort.Direction.ASC, "order");
        ArrayList<Service> services = (ArrayList<Service>) serviceRepository.findAll(sort);
        Integer size = services.size();
    }


}
