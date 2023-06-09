package com.ssafy.tedbear.domain.video.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoBookmark;

@Repository
public interface VideoBookmarkRepository extends JpaRepository<VideoBookmark, Long> {
	Optional<VideoBookmark> findVideoBookmarkByMemberAndVideo(Member member, Video video);

	@Query("select v from VideoBookmark v  where v.video in :videoList and v.member = :member")
	List<VideoBookmark> findVideoBookmarksByMemberAndVideoIn(Member member, List<Video> videoList);

	@Query("select v from VideoBookmark v  join fetch v.video where v.member = :member")
	Slice<VideoBookmark> findVideoBookmarksByMember(Member member, Pageable pageable);

	void deleteByMemberAndVideo(Member member, Video video);
}
