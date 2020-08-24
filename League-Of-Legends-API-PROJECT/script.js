var app = angular.module('mainApp', []);

app.controller('angularController', function ($scope, $http,$sce) {

    $scope.displayOn = false
    $scope.displayOff = true
    let count = 0
    $scope.total = 0

    function padLeft(id, str){
        $scope.total = Array(4-String(id).length+1).join(str||'0')+id;
    }

    $scope.flipForFront = function () {
        document.getElementById('rotate').style='transform: rotateY(0deg);'
    }
    $scope.flipForBack = function() {
        document.getElementById('rotate').style='transform: rotateY(-180deg);'
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
            console.log(response)
            $scope.id = response.data.data[champion]["id"]
            let skinId = response.data.data[champion]["skins"][0]['id']
            let newIdValue = skinId/1000

            const skillP = response.data.data[champion]["passive"]["image"]["full"]
            const skillQ = response.data.data[champion]["spells"][0]["image"]["full"]
            const skillW = response.data.data[champion]["spells"][1]["image"]["full"]
            const skillE = response.data.data[champion]["spells"][2]["image"]["full"]
            const skillR = response.data.data[champion]["spells"][3]["image"]["full"]
            $scope.skillP = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/" + skillP
            $scope.skillQ = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillQ
            $scope.skillW = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillW
            $scope.skillE = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillE
            $scope.skillR = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/" + skillR

            $scope.skillPName = response.data.data[champion]["passive"]["name"]
            $scope.skillQName = response.data.data[champion]["spells"][0]["name"]
            $scope.skillWName = response.data.data[champion]["spells"][1]["name"]
            $scope.skillEName = response.data.data[champion]["spells"][2]["name"]
            $scope.skillRName = response.data.data[champion]["spells"][3]["name"]
            
            $scope.video = function (skill) {
                console.log(skill)
                 
                let [skillPDesc,skillQDesc,skillWDesc,skillEDesc,skillRDesc] = [response.data.data[champion]["passive"]["description"],response.data.data[champion]["spells"][0]["description"],response.data.data[champion]["spells"][1]["description"],response.data.data[champion]["spells"][2]["description"],response.data.data[champion]["spells"][3]["description"]]                
                
                if(skill === "P"){
                    let stripedHtmlP = skillPDesc.replace(/<[^>]+>/g, '');
                    document.getElementById('skillContent').innerHTML = `${stripedHtmlP}`
                    $scope.link = document.getElementById('skillImage').innerHTML = `${$scope.skillP}`
                    document.getElementById('skillTitle').innerHTML = `${$scope.skillPName}`
                }else if (skill === "Q") {
                    let stripedHtmlQ = skillQDesc.replace(/<[^>]+>/g, '');
                    document.getElementById('skillContent').innerHTML = `${stripedHtmlQ}`
                    $scope.link = document.getElementById('skillImage').innerHTML = `${$scope.skillQ}`
                    document.getElementById('skillTitle').innerHTML = `${$scope.skillQName}`
                }else if (skill === "W") {
                    let stripedHtmlW = skillWDesc.replace(/<[^>]+>/g, '');
                    document.getElementById('skillContent').innerHTML = `${stripedHtmlW}`
                    $scope.link = document.getElementById('skillImage').innerHTML = `${$scope.skillW}`
                    document.getElementById('skillTitle').innerHTML = `${$scope.skillWName}`
                }else if (skill === "E") {
                    let stripedHtmlE = skillEDesc.replace(/<[^>]+>/g, '');
                    document.getElementById('skillContent').innerHTML = `${stripedHtmlE}`
                    $scope.link = document.getElementById('skillImage').innerHTML = `${$scope.skillE}`
                    document.getElementById('skillTitle').innerHTML = `${$scope.skillEName}`
                }else if (skill === "R") {
                    let stripedHtmlR = skillRDesc.replace(/<[^>]+>/g, '');
                    document.getElementById('skillContent').innerHTML = `${stripedHtmlR}`
                    $scope.link = document.getElementById('skillImage').innerHTML = `${$scope.skillR}`
                    document.getElementById('skillTitle').innerHTML = `${$scope.skillRName}`
                }
               
               
               
                
                

                padLeft(newIdValue)
                $scope.preview = 'https://d28xe8vt774jo5.cloudfront.net/champion-abilities/'+ $scope.total +'/ability_'+ $scope.total + '_' + skill + '1.webm' 
        
                $scope.trustSrc = function(src) {
                    return $sce.trustAsResourceUrl(src);
                };
                
            }
           
            $scope.lore = response.data.data[champion]["lore"]

            $scope.attackDamage = response.data.data[champion]["stats"]["attackdamage"]
            $scope.range = response.data.data[champion]["stats"]["attackrange"]
            $scope.moveS  = response.data.data[champion]["stats"]["movespeed"]
            $scope.life = response.data.data[champion]["stats"]["hp"]
            $scope.mana = response.data.data[champion]["stats"]["mp"]
            $scope.armor = response.data.data[champion]["stats"]["armor"]
            $scope.lifeRegen = response.data.data[champion]["stats"]["hpregen"]
            $scope.manaRegen = response.data.data[champion]["stats"]["mpregen"]
            $scope.magicResistence = response.data.data[champion]["stats"]["spellblock"]
            
            const fullSplash = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion + "_0.jpg"
            $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_0.jpg"
            $scope.icon = "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/" + champion + ".png"
           
            $scope.skinNext = function () {
                count++
                let caminhoLength = response.data.data[champion]["skins"]
                if (count>=(caminhoLength.length)){
                    count--
                }
                let caminho = response.data.data[champion]["skins"][count]
                $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_" + caminho.num + ".jpg"
            }

            $scope.skinPrev = function () {
                count --
                if(count <= 0){count = 0}
                let arrayNormal = response.data.data[champion]["skins"][count]
                $scope.splash = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion + "_" + arrayNormal.num + ".jpg"
            }
            

            let changeFullSplash = () =>{
                document.getElementById('exampleModal').style='background-image: url("' + fullSplash + '");'
            }

            changeFullSplash()

        }).then(function errorCallBack(response) {
        
        })
    }
    
});
