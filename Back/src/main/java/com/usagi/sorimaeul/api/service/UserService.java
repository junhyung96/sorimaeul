package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.UserInfoRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(long userCode) {
        return userRepository.getUser(userCode);
    }

    public UserInfoResponse signUp(long userCode, UserInfoRequest request) {
        userRepository.joinUser(userCode, request);

        User user = userRepository.getUser(userCode);

        return UserInfoResponse.builder()
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .learnCount(user.getLearnCount())
                .build();
    }

    public int checkNickname(String nickname) {
        return userRepository.checkNickname(nickname);
    }

    public UserInfoResponse modifyUserInfo(long userCode, UserInfoRequest request) {
        userRepository.updateUser(userCode, request);

        User user = userRepository.getUser(userCode);

        return UserInfoResponse.builder()
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .learnCount(user.getLearnCount())
                .build();
    }

    public UserInfoResponse userInfo(long userCode) {
        return userRepository.getUserInfo(userCode);
    }

}
