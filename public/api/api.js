const apiMusic = {
  // /api == http://localhost:3000/banner
  findBanner: '/api/banner', // 可获取发现页banner( 轮播图 ) 数据
  loginCellphone: '/api/login/cellphone',  // 手机登陆
  userPlaylist: '/api/user/playlist',  // 获取用户歌单
  playlistDetail: '/api/playlist/detail',  // 获取歌单详情 http://localhost:3000/playlist/detail
  musicUrl: '/api/music/url', // 获取音乐url
  search: '/api/search',  // 搜素音乐
  lyric: '/api/lyric',  // 获取歌词
  comment: '/api/comment',  // 获取评论
  album: '/api/album', //  获取专辑内容
  artists: '/api/artists',  // 获取歌手单曲列表
  artistAlbum: '/api/artist/album',  // 获取歌手专辑列表
  artistDesc: '/api/artist/desc', //  获取歌手信息
  recommendResource: '/api/recommend/resource', // 获取每日推荐歌单（用户级）
  recommendSongs: '/api/recommend/songs',  // 获取每日推荐歌曲（用户级）
  personalFm: '/api/personal_fm', // 私人FM   用户级)
  dailySignin: '/api/daily_signin',  // 签到   用户级)
  likeMusic: '/api/like', // 添加喜欢的音乐   用户级)
  fmTrash: '/api/fm_trash', // 将音乐从私人FM中移除至垃圾桶
  topPlaylist: '/api/top/playlist', //  歌单   网友精选歌单)
  newAlbum: '/api/top/albums',  // 新碟上架
  topArtists: '/api/top/artists', //  热门歌手
  topList: '/api/top/list', //  音乐排行榜
  personalized: '/api/personalized', //  推荐歌单
  privatecontent: '/api/personalized/privatecontent',  // 独家放送
  personalizedMv: '/api/personalized/mv',  // 推荐MV
  newSong: '/api/personalized/newsong', // 推荐音乐
  djProgram: '/api/personalized/djprogram',  // 推荐电台
  mv: '/api/mv', // 获取mv数据
  simiMv: '/api/simi/mv', // 获取相似mv
  mvComment: '/api/comment/mv',  // 获取mv评论
  playlistComment: '/api/comment/playlist',  // 获取歌单评论
  albumComment: '/api/comment/album',  // 获取专辑评论
  artistMv: '/api/artist/mv'  // 获取歌手MV
}

export const LoginCellphoneResource =  apiMusic.loginCellphone
export const UserPlaylistResource =  apiMusic.userPlaylist
export const PlaylistDetailResource =  apiMusic.playlistDetail
export const MusicUrlResource =  apiMusic.musicUrl
export const SearchResource =  apiMusic.search
export const LyricResource =  apiMusic.lyric
export const CommentResource =  apiMusic.comment
export const AlbumResource =  apiMusic.album
export const ArtistsResource =  apiMusic.artists
export const ArtistAlbumResource =  apiMusic.artistAlbum
export const ArtistDescResource =  apiMusic.artistDesc
export const RecommendResource =  apiMusic.recommendResource
export const RecommendSongsResource =  apiMusic.recommendSongs
export const PersonalFmResource =  apiMusic.personalFm
export const DailySigninResource =   apiMusic.dailySignin
export const LikeMusicResource =   apiMusic.likeMusic
export const FmTrashResource =   apiMusic.fmTrash
export const TopPlaylistResource =   apiMusic.topPlaylist
export const NewAlbumResource =   apiMusic.newAlbum
export const TopArtistsResource = apiMusic.topArtists
export const TopListResource =   apiMusic.topList
export const PersonalizedResource =     apiMusic.personalized
export const PrivatecontentResource =     apiMusic.privatecontent
export const PersonalizedMvResource =     apiMusic.personalizedMv
export const NewSongResource =     apiMusic.newSong
export const DjProgramResource =     apiMusic.djProgram
export const MvResource =     apiMusic.mv
export const SimiMvResource =     apiMusic.simiMv
export const MvCommentResource =     apiMusic.mvComment
export const PlaylistCommentResource =     apiMusic.playlistComment
export const AlbumCommentResource =     apiMusic.albumComment
export const ArtistMvResource =     apiMusic.artistMv

// 文件存放一个位置
// 进入文件夹内，执行命令，npm install 安装所有项目依赖
// 运行 node app
// 这个命令窗口不能关闭，关闭后接口没法调用
