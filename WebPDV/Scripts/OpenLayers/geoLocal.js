//https://gist.githubusercontent.com/neogis-de/154f4bd155f77e0f3689/raw/5a1642fac4afff463c3ff08beaad55892fe9acd4/geojson.js

var wgs84Sphere = new ol.Sphere(6378137);

/**
* RRenderiza uma barra de progresso no mapa.
* @param {Element} el The target element.
* @constructor
*/
function Progress(el) {
    this.el = el;
    this.loading = 0;
    this.loaded = 0;
}
/**
* Increment the count of loading tiles.
*/
Progress.prototype.addLoading = function () {
    if (this.loading === 0) {
        this.show();
    }
    ++this.loading;
    this.update();
};
/**
* Increment the count of loaded tiles.
*/
Progress.prototype.addLoaded = function () {
    var this_ = this;
    setTimeout(function () {
        ++this_.loaded;
        this_.update();
    }, 100);
};
/**
* Update the progress bar.
*/
Progress.prototype.update = function () {
    var width = (this.loaded / this.loading * 100).toFixed(1) + '%';
    this.el.style.width = width;
    if (this.loading === this.loaded) {
        this.loading = 0;
        this.loaded = 0;
        var this_ = this;
        setTimeout(function () {
            this_.hide();
        }, 500);
    }
};
/**
* Show the progress bar.
*/
Progress.prototype.show = function () {
    this.el.style.visibility = 'visible';
};
/**
* Hide the progress bar.
*/
Progress.prototype.hide = function () {
    if (this.loading === this.loaded) {
        this.el.style.visibility = 'hidden';
        this.el.style.width = 0;
    }
};

var progress = new Progress(document.getElementById('progress'));

/*
imagem de círculo vetorial
*/
var image = new ol.style.Circle({
    radius: 5,
    //fill: null,
    fill: new ol.style.Fill({color: 'red'}),
    stroke: new ol.style.Stroke({ color: 'yellow', width: 1 })
});

/*
imagem de bandeira para pontos
*/
var bandeira = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: 'http://localhost:8087/imagens/marcas/bandeira_verde.png'
    })
});

/*
definição de estilos
*/
var styles = {
    'Point': bandeira,/*new ol.style.Style({
                image: image
            }),*/
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new ol.style.Style({
        image: image
    }),
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    }),
    'bandeiraVerde': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: 'http://localhost:8087/imagens/marcas/bandeira_verde.png'
        })
    })
};

/*
função para definir o estilo a ser aplicado a cada feature
*/
var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

var geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': [/*{
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [0, 0]
                }
            },*/ {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[4e6, -2e6], [8e6, 2e6]]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[4e6, 2e6], [8e6, -2e6]]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'MultiLineString',
                    'coordinates': [
                      [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                      [[1e6, -7.5e5], [1e6, 7.5e5]],
                      [[-7.5e5, -1e6], [7.5e5, -1e6]],
                      [[-7.5e5, 1e6], [7.5e5, 1e6]]
                    ]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'MultiPolygon',
                    'coordinates': [
                      [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6], [-3e6, 6e6]]],
                      [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6], [0, 6e6]]],
                      [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6], [3e6, 6e6]]]
                    ]
                }
            }, {
                'type': 'Feature',
                'geometry': {
                    'type': 'GeometryCollection',
                    'geometries': [{
                        'type': 'LineString',
                        'coordinates': [[-5e6, -5e6], [0, -5e6]]
                    }, {
                        'type': 'Point',
                        'coordinates': [4e6, -5e6]
                    }, {
                        'type': 'Polygon',
                        'coordinates': [[[1e6, -6e6], [2e6, -4e6], [3e6, -6e6]]]
                    }]
                }
            }]
};

var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
});

//vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

vectorSource.clear();

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: styleFunction
});

var view = new ol.View({
    projection: "WGS84",
    center: [-40.30774, -20.31229],
    zoom: 4
});

//fundo do mapa
var source = new ol.source.OSM();

//adição das propriedades do loading bar
source.on('tileloadstart', function () {
    //mostraSplash();
    progress.addLoading();
});

source.on('tileloadend', function () {
    //escondeSplash();
    progress.addLoaded();
});

source.on('tileloaderror', function () {
    //escondeSplash();
    progress.addLoaded();
});

/*
carrega o mapa
*/
var map = new ol.Map({
    layers: [
      new ol.layer.Tile({source: source}),
      vectorLayer
    ],
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: /**@@type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: view
});

/*
função para ler o json com as informações dos pontos e adicionar no mapa
*/
var addGJSON = function () {
    $.getJSON("http://localhost:8087/?controle=WebSISADIN.controle.controles.geoLocal.ControleGeoLocal&acao=todosGJSON",
        function (data) {
            vectorSource.clear();
            var feat = new ol.format.GeoJSON().readFeatures(data);
            vectorSource.addFeatures(feat);
        });
}

/*
função para exibir um alerta com a quantidade de features no layer de vetor
*/
var contaFeatures = function () {
    utilJS.exibeAlerta(vectorSource.getFeatures().length);
    //alert(vectorSource.getFeatures()[0]);
    /*var ret = "";
    $.each(vectorSource.getFeatures()[0], function (key, val) {
        ret += "" + key + " = " + val + "\n";
    });
    alert(ret);*/
    //alert(vectorSource.getFeatures()[0].getGeometry());
    /*var ret = "";
    $.each(vectorSource.getFeatures()[0].getGeometry(), function (key, val) {
        ret += "" + key + " = " + val + "\n";
    });
    alert(ret);*/

    //alert(vectorSource.getFeatures()[0].getGeometry().getExtent()[0])
}

/*
função para acertar a tela do mapa em relação aos pontos carregados
*/
var zoomTo = function () {
    if (vectorSource.getFeatures().length > 0) {
        /*var somaX = 0, somaY = 0, contaX = 0, contaY = 0;
        var minX = null, minY = null, maxX = null, maxY = null;

        for (i = 0; i < vectorSource.getFeatures().length; i++) {
            var feature = vectorSource.getFeatures()[i];
            var xmin = feature.getGeometry().getExtent()[0];
            var ymin = feature.getGeometry().getExtent()[1];
            var xmax = feature.getGeometry().getExtent()[2];
            var ymax = feature.getGeometry().getExtent()[3];
            if (minX == null || ((minX != null) && (minX > xmin))) {
                minX = xmin;
            }
            if (minY == null || ((minY != null) && (minY > ymin))) {
                minY = ymin;
            }
            if (maxX == null || ((maxX != null) && (maxX < xmax))) {
                maxX = xmax;
            }
            if (maxY == null || ((maxY != null) && (maxY < ymax))) {
                maxY = ymax;
            }
        }*/

        var extent = vectorSource.getExtent();
        view.fit(extent, map.getSize());
    }
}


/*********************************************************************
POPUPMAPA
funções para exibir o popup dos pontos no mapa
*********************************************************************/
var popupMapa = document.getElementById('popup');

var popup = new ol.Overlay({
    element: popupMapa,
    positioning: 'bottom-center',
    stopEvent: false
});
map.addOverlay(popup);

/*
clique do mapa
exibe o popup caso clique no ponto
*/
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {            
            return feature;
        });

    if (feature) {
        $(popupMapa).popover('destroy');
        var conteudo = '<p>Você clicou no ponto:</p><code>' + feature.get('name') + '</code>';
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.setPosition(coord);
        $(popupMapa).popover({
            'placement': 'top',
            'animation': false,
            'html': true,
            'content': conteudo
        });
        $(popupMapa).popover('show');
    } else {
        $(popupMapa).popover('destroy');
    }
});
/*********************************************************************
POPUPMAPA
funções para exibir o popup dos pontos no mapa
*********************************************************************/
/*
função para determinar a distância ou tamanho de uma linha
*/
var formatLength = function (line) {
    var length;
    var isGEODESICO = true;
    if (isGEODESICO) {
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
        }
    } else {
        length = Math.round(line.getLength() * 100) / 100;
    }
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};

var testeDist = function () {
    var coords = [[0, 0], [10, 10]];
    var linha = new ol.geom.LineString(coords);
    alert(formatLength(linha));
};
