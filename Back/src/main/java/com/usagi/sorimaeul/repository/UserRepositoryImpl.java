package com.usagi.sorimaeul.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.usagi.sorimaeul.dto.request.UserInfoRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.QUser;
import com.usagi.sorimaeul.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QUser quser = QUser.user;

    public User getUser(long userCode) {
        return queryFactory
                .select(quser)
                .from(quser)
                .where(quser.userCode.eq(userCode))
                .fetchFirst();
    }

    public void joinUser(long userCode, UserInfoRequest request) {
        queryFactory
                .insert(quser)
                .columns(
                        quser.userCode,
                        quser.nickname,
                        quser.profileImage)
                .values(
                        userCode,
                        request.getNickname(),
                        request.getProfileImage())
                .execute();

    }

    public int checkNickname(String nickname) {
        return queryFactory
                .select(quser.count())
                .from(quser)
                .where(quser.nickname.eq(nickname))
                .fetchFirst()
                .intValue();
    }

    public UserInfoResponse getUserInfo(long userCode) {
        Tuple userInfo = queryFactory
                .select(quser.nickname, quser.profileImage, quser.learnCount, quser.coverCount, quser.dubCount)
                .from(quser)
                .where(quser.userCode.eq(userCode))
                .fetchFirst();

        return UserInfoResponse.builder()
                .nickname(userInfo.get(quser.nickname))
                .profileImage(userInfo.get(quser.profileImage))
                .learnCount(userInfo.get(quser.learnCount))
                .coverCount(userInfo.get(quser.coverCount))
                .dubCount(userInfo.get(quser.dubCount))
                .build();
    }

    @Override
    public void updateUser(long userCode, UserInfoRequest request) {
        queryFactory
                .update(quser)
                .set(quser.nickname, request.getNickname())
                .set(quser.profileImage, request.getProfileImage())
                .where(quser.userCode.eq(userCode))
                .execute();
    }

}
