package com.threefish.semahi.repo;


import com.threefish.semahi.model.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by reza on 11/12/16.
 */
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaSpecificationExecutor<User> {
}
