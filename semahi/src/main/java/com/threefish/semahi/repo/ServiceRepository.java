package com.threefish.semahi.repo;

import com.threefish.semahi.model.Service;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by r.kashmir on 6/28/2017.
 */
public interface ServiceRepository extends PagingAndSortingRepository<Service, Long> {
    Iterable<Service> findAllByActiveTrue();
}
