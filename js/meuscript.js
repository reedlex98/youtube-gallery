const channel = 'UC4X7J9D6VbTIwnFDFNkfQ1A'
let uploadId = ''
const videoUrl = []

$(document).ready(function() {
    $.get("https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            id: channel,
            key: 'AIzaSyDuWqeAUTS8liVbdDTAEDGosHZO-1tk70s'
        },
        function(data, textStatus, jqXHR) {
            uploadId = data.items[0].contentDetails.relatedPlaylists.uploads
            getVideos(uploadId)
        }
    );

    function getVideos(id) {
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 50,
                playlistId: id,
                key: 'AIzaSyDuWqeAUTS8liVbdDTAEDGosHZO-1tk70s'
            },
            function(data, textStatus, jqXHR) {
                $.each(data.items, function(index, element) {
                    image = element.snippet.thumbnails.medium.url
                    title = element.snippet.title
                    description = element.snippet.description
                    address = element.snippet.resourceId.videoId
                    data = element.snippet.publishedAt.split('T')[0].split('-').reverse().join('/')
                    listItem = `<li>
                                    <a data-src="https://www.youtube.com/watch?v=${address}" data-fancybox data-caption="${title}" class="fancybox-media">
                                        <div class="photo">
                                            <img src="${image}" alt="${title}"/>
                                            <div class="text">
                                                <p class="title">${title}</p>
                                                <p>Release date: ${data}</p>
                                                <p class="desc">${description}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>`
                    $('#janela ul').append(listItem)
                });
            }
        );
    }

    $('.fancybox').fancybox()
    const fbWidth = 800
    const fbHeight = 450

    $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
            selector: '.imglist a:visible',
            arrows: false,
            'maxWidth': fbWidth,
            'maxHeight': fbHeight,
            'width': fbWidth,
            'height': fbHeight,
            helpers: {
                media: {},
                buttons: {}
            }
        })

})