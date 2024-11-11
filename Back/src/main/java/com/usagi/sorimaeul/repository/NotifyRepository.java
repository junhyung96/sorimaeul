package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotifyRepository extends JpaRepository<Notify, Integer>, NotifyRepositoryCustom {

	List<Notify> findAllByUserCodeOrderByNotifyCodeDesc(long userCode);

}
