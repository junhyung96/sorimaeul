package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CustomUserDetailsDto;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
		User user = userRepository.getUser(Long.parseLong(userCode));

		return new CustomUserDetailsDto(user);
	}

}
