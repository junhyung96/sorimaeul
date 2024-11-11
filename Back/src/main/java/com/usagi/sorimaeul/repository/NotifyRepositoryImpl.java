package com.usagi.sorimaeul.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.usagi.sorimaeul.dto.dto.NotifyDto;
import com.usagi.sorimaeul.dto.request.SseRequest;
import com.usagi.sorimaeul.entity.QNotify;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotifyRepositoryImpl implements NotifyRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	private final QNotify qnotify = QNotify.notify;

	@Override
	public int checkNotify(int notifyCode) {
		return (int) queryFactory
				.update(qnotify)
				.set(qnotify.isChecked, 1)
				.where(qnotify.notifyCode.eq(notifyCode))
				.execute();
	}

	@Override
	public int deleteNotify(int notifyCode) {
		return (int) queryFactory
				.delete(qnotify)
				.where(qnotify.notifyCode.eq(notifyCode))
				.execute();
	}

	@Override
	public void insertNotify(SseRequest request) {
		long userCode = request.getUserCode();
		String type = request.getName();
		NotifyDto data = request.getData();

		queryFactory.insert(qnotify)
				.columns(qnotify.userCode,
						qnotify.notifyContent,
						qnotify.notifyType,
						qnotify.targetCode)
				.values(userCode,
						data.getContent(),
						type,
						data.getTargetCode())
				.execute();
	}

}
