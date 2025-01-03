import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr';
import PostCard from '../../components/PostCard';
import { Comment, Post } from '../../types';

const UserPage = () => {
    const router = useRouter();
    const username = router.query.username;    

    const{data, error} = useSWR<any>(username ? `/users/${username}` : null)
    if(!data) return null
  return (
    <div className='flex max-w-5xl px-4 pt-5 mx-auto'>
        {/* 유저 포스트 댓글 리스트 */}
        <div className='w-full md:mr-3 md:w-8/12'>
            {data.userData.map((data: any)=> {
                if (data.type === "Post") {
                    const post: Post = data;
                    return <PostCard key={post.identifier} post={post} />
                } else {
                    const comment: Comment = data;
                    return (
                        <div
                            key={comment.identifier}
                            className='flex my-4 bg-white rounded'
                        >
                            <div className='flex-shrink-0 w-10 py-10 text-center bg-white border-r rounded-l'>
                                <i className='text-gray-500 fas fa-comment-alt fa-xs'></i>                                
                            </div>
                            <div className='w-full p-2'>
                                <p className='mb-2 text-xs text-gray-500'>
                                    <Link href={`/u/${comment.username}`}>
                                        <a className='cursor-pointer hover:underline'>
                                            {comment.username}
                                        </a>
                                    </Link>{" "}
                                    <span>commented on</span>{" "}
                                    <Link href={`/${comment.post?.url}`}>
                                        <a className='cursor-pointer font-semibold hover:underline'>
                                            {comment.post?.url}
                                        </a>
                                    </Link>{" "}
                                    <span>·</span>{" "}
                                    <Link href={`/u/${comment.post?.subName}`}>
                                        <a className='cursor-pointer text-black hover:underline'>
                                            {comment.post?.subName}
                                        </a>
                                    </Link>
                                </p>
                                <hr/>
                                <p className='p-1'>{comment.body}</p>
                            </div>
                        </div>
                    )
                }
            })}

        </div>
        {/* 유저 정보 */}
          <div className='hidden w-4/12 ml-3 md:block text-basic-white'>
              <div className='p-3 rounded-t bg-basic-black-second flex items-center'
              style={{
                background: `linear-gradient(-45deg, #ff4654 50%, #101823 50%)`,
              }}
            >
                <Image
                    src="https://www.gravatar.com/avatar/0000?d=mp&f=y"
                    alt="user profile"
                    className='mx-auto border border-white rounded-full'
                    width={40}
                    height={40}
                >
                </Image>
                <p className='pl-2 text-md'>{data.user.username}</p>
            </div>
              <div className='p-2 bg-white rounded-b text-basic-black font-ptBlack'>
                <p>
                    {dayjs(data.user.createdAt).format("YYYY.MM.DD")} 가입
                </p>
            </div>
        </div>
    </div>
  )
}

export default UserPage