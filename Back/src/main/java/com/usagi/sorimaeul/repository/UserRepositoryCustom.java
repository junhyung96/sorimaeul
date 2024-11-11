package com.usagi.sorimaeul.repository;


import com.usagi.sorimaeul.dto.request.UserInfoRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.User;

public interface UserRepositoryCustom {
    User getUser(long userCode);

    void joinUser(long userCode, UserInfoRequest request);

    int checkNickname(String nickname);

    UserInfoResponse getUserInfo(long userCode);

    void updateUser(long userCode, UserInfoRequest request);

}
