package com.threefish.semahi.repo;

import com.threefish.semahi.model.Picture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by reza on 11/13/16.
 */
public interface PictureRepository extends PagingAndSortingRepository<Picture, Long> {
    public Iterable<Picture> findByPublished(Boolean published);

    public Page<Picture> findByTypeEquals(String type, Pageable pageable);

}
