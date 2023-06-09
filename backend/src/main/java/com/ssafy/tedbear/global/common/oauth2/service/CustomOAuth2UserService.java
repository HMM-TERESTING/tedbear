package com.ssafy.tedbear.global.common.oauth2.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.tedbear.global.common.oauth2.dto.CustomOAuth2User;
import com.ssafy.tedbear.global.common.oauth2.dto.KakaoOAuth2User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		log.info("oauth provider: {}", registrationId);

		CustomOAuth2User customOAuth2User = new KakaoOAuth2User(
			oAuth2User.getAttributes(),
			Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
			String.valueOf(oAuth2User.getAttributes().get("id"))
		);

		// log.info("oauth login success - user : {}", user);

		return customOAuth2User;
	}

}
