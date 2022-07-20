import MediaTitle from "./media/MediaTitle.vue";
import MediaArtist from "./media/MediaArtist.vue";
import MediaCover from "./media/MediaCover.vue";
import MediaUsername from "./media/MediaUsername.vue";
import MediaAlbum from "./media/MediaAlbum.vue";
import PlaylistContainer from "./playlist/PlaylistContainer.vue";
import PlaylistTitle from "./playlist/Title.vue";
import PlaylistArtist from "./playlist/Username.vue";
import PlaylistIndex from "./playlist/Index.vue";
import PlaylistUsername from "./playlist/Artist.vue";
import PlaylistAlbum from "./playlist/Album.vue";
import CurrentTime from "./info/CurrentTime.vue";
import CurrentLyric from "./info/CurrentLyric.vue";
import TotalTime from "./info/TotalTime.vue";


export default {
    components: {
        MediaTitle,MediaArtist,MediaCover,MediaUsername,MediaAlbum,
        PlaylistContainer,PlaylistTitle,PlaylistArtist,PlaylistIndex,PlaylistUsername,PlaylistAlbum,
        CurrentTime,CurrentLyric,TotalTime
    }
}