var app = angular.module('mainApp', []);

app.controller('angularController', function ($scope, $http) {

    $scope.displayOn = false
    $scope.displayOff = true
    let count = 0
    $scope.total = 0

    function padLeft(id, str){
        $scope.total = Array(4-String(id).length+1).join(str||'0')+id;
        console.log($scope.total);
    }

    app.directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
              element.bind('error', function() {
                if (attrs.src != attrs.onErrorSrc) {
                  attrs.$set('src', attrs.onErrorSrc);
                }
              });
            }
        }
    });

    $scope.flipForFront = function () {
        document.getElementById('test1').style='transform: rotateY(0deg);'
    }
    $scope.flipForBack = function() {
        document.getElementById('test1').style='transform: rotateY(-180deg);'
    }
    $scope.viewOn = function () {
        var remove = document.getElementsByClassName('remove')
        for (let i = 0; i < remove.length; i++) {
            remove[i].style.display="none"
        }
        $scope.displayOn = true
        $scope.displayOff = false
    }
    $scope.viewOff = function () {
        var remove = document.getElementsByClassName('remove')
        for (let i = 0; i < remove.length; i++) {
            remove[i].style.display="block"
        }
        $scope.displayOff = true
        $scope.displayOn = false
    }
    
    $scope.search = function (champion) {
        $http({
            method: 'GET',
            url: 'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/' + champion + '.json'
        }).then(function sucessCallBack(response) {
            console.log(response);
            $scope.id = response.data.data[champion]["id"]
            let skinId = response.data.data[champion]["skins"][0]['id']
            let newIdValue = skinId/1000
            padLeft(newIdValue)
            $scope.lore = response.data.data[champion]["lore"]
            const skillP = response.data.data[champion]["passive"]["image"]["full"]
            const skillQ = response.data.data[champion]["spells"][0]["image"]["full"]
            const skillW = response.data.data[champion]["spells"][1]["image"]["full"]
            const skillE = response.data.data[champion]["spells"][2]["image"]["full"]
            const skillR = response.data.data[champion]["spells"][3]["image"]["full"]
            $scope.skillPDesc = response.data.data[champion]["passive"]["description"]
            $scope.skillQDesc = response.data.data[champion]["spells"][0]["description"]
            $scope.skillWDesc = response.data.data[champion]["spells"][1]["description"]
            $scope.skillEDesc = response.data.data[champion]["spells"][2]["description"]
            $scope.skillRDesc = response.data.data[champion]["spells"][3]["description"]
            let skillWDescc = $scope.skillWDesc
            $scope.stripedHtml = skillWDescc.replace(/<[^>]+>/g, '');
            console.log($scope.stripedHtml);
            $scope.videoP = "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0142/ability_0142_W1.webm"
            $scope.videoQ = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/'+ $scope.total +'/ability_'+ $scope.total +'_Q1.webm'
            $scope.videoW = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/'+ $scope.total +'/ability_'+ $scope.total +'_W1.webm'
            $scope.videoE = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/'+ $scope.total +'/ability_'+ $scope.total +'_E1.webm'
            $scope.videoR = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/'+ $scope.total +'/ability_'+ $scope.total +'_R1.webm'
            $scope.attackDamage = response.data.data[champion]["stats"]["attackdamage"]
            $scope.range = response.data.data[champion]["stats"]["attackrange"]
            $scope.moveS  = response.data.data[champion]["stats"]["movespeed"]
            $scope.life = response.data.data[champion]["stats"]["hp"]
            $scope.mana = response.data.data[champion]["stats"]["mp"]
            $scope.armor = response.data.data[champion]["stats"]["armor"]
            $scope.lifeRegen = response.data.data[champion]["stats"]["hpregen"]
            $scope.manaRegen = response.data.data[champion]["stats"]["mpregen"]
            $scope.magicResistence = response.data.data[champion]["stats"]["spellblock"]
            $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_0.jpg"
            $scope.icon = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/" + champion + ".png"
            $scope.skillP = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/" + skillP
            $scope.skillQ = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillQ
            $scope.skillW = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillW
            $scope.skillE = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillE
            $scope.skillR = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillR

            $scope.skinNext = function () {
                count++
                let caminhoLength = response.data.data[champion]["skins"]
                if (count>=(caminhoLength.length)){
                    count--
                }
                let caminho = response.data.data[champion]["skins"][count]
                console.log("count = " + count);
                $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_" + caminho.num + ".jpg"
            }

            $scope.skinPrev = function () {
                count --
                if(count <= 0){count = 0}
                let arrayNormalLength = response.data.data[champion]["skins"]
                let arrayNormal = response.data.data[champion]["skins"][count]
                console.log("count = " + count);
                $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_" + arrayNormal.num + ".jpg"
            }

            console.log('total total' + $scope.total);

        }).then(function errorCallBack(response) {
        
        })
    }
    
    // $scope.name = "Annie"
    // $http({
    //     method: 'GET',
    //     url: 'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json'
    // }).then(function successCallback(response) {
    //     $scope.loading = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + $scope.name + "_0.jpg"
    //     
    // }, function errorCallback(response) {

    // });
    // $http({
    //     method: 'GET',
    //     url: 'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion/'+ $scope.name + '.json'
    // }).then(function successCallback(response) {
    //     console.log(response);
    //     $scope.skillP = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/" + $scope.name + "_Passive.png"
    //     console.log($scope.skillP);
    //     $scope.skillQ = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + $scope.name + "Q.png"
    //     $scope.skillW = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + $scope.name + "W.png"
    //     $scope.skillE = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + $scope.name + "E.png"
    //     $scope.skillR = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + $scope.name + "R.png"
    //     console.log($scope.teste);
    // }, function errorCallback(response) {

    // });
});
