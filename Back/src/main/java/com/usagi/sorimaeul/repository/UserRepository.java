package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    List<User> findByUserCode(long UserCode);

}
