package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.RequestBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestBoardRepository extends JpaRepository<RequestBoard, Integer> {

    RequestBoard findByBoardCode(int boardCode);

    List<RequestBoard> findByTypeCodeOrderByCreatedTimeDesc(int typeCode);

    List<RequestBoard> findByTypeCode(int typeCode);
}
