import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

export default function Center() {
  const { data: session } = useSession()

  const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-yellow-500',
    'from-gray-500',
    'from-pink-500',
    'from-purple-500',
    'from-cyan-500',
    'from-red-500',
  ]

  const [color, setColor] = useState(null)
  const playlistsId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const spotifyApi = useSpotify()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistsId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistsId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('Something went wrong!', err))
  }, [spotifyApi, playlistsId])

  console.log(playlist)

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      {/* This is the profile */}
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-2 rounded-full bg-black p-3 text-white opacity-90 hover:opacity-80">
          <h2 className="rounded-full">{session?.user.name}</h2>
        </div>
      </header>

      {/* This is the playlist */}
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0].url}
          alt=""
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-6xl">
            {playlist?.name}
          </h1>
          <p className="pt-2 text-gray-400">{playlist?.description}</p>
          <div className="flex justify-between">
            <p>{playlist?.owner.display_name}</p>
            <p>{playlist?.followers.total} likes</p>
          </div>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}
