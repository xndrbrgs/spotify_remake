import React, { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'

import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import { HeartIcon } from '@heroicons/react/solid'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistsId, setPlaylistsId] = useRecoilState(playlistIdState)

  console.log('You picked playlist: ', playlistsId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] lg:text-sm hidden md:inline-flex">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-red-500" />
          <p>Your Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-blue-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistsId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
