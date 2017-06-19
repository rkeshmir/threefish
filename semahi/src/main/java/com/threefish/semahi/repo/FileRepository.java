package com.threefish.semahi.repo;

import com.threefish.semahi.model.File;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by reza on 11/14/16.
 */
public interface FileRepository extends PagingAndSortingRepository<File, Long> {
}
