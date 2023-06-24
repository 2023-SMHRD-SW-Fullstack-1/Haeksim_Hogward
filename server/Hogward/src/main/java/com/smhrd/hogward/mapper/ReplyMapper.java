package com.smhrd.hogward.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.hogward.domain.ReplyDTO;
import com.smhrd.hogward.domain.T_Reply;

@Mapper
public interface ReplyMapper {
	public int writeReply(T_Reply reply);
	public List<ReplyDTO> replylist(int b_seq);
}
