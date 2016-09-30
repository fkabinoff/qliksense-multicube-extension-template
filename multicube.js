define(["qlik"], function (qlik) {
  return {
    initialProperties: {
      cube1: {
        qHyperCubeDef: {
          qDimensions: [],
          qMeasures: [],
          qInitialDataFetch: [{
            qWidth: 2,
            qHeight: 5000
          }]
        }
      },
      cube2: {
        qHyperCubeDef: {
          qDimensions: [],
          qMeasures: [],
          qInitialDataFetch: [{
            qWidth: 2,
            qHeight: 5000
          }]
        }
      }
    },
    definition: {
      type: "items",
      component: "accordion",
      items: {
        cube1props: {
          label: "Cube 1",
          type: "items",
          items: {
            dimension: {
              label: "Dimension",
              type: "string",
              expression: "always",
              expressionType: "dimension",
              ref: "cube1props.dimension"
            }, 
            measure: {
              label: "Measure",
              type: "string",
              expression: "always",
              expressionType: "measure",
              ref: "cube1props.measure"
            },
          }
        },
        cube2props: {
          label: "Cube 2",
          type: "items",
          items: {
            dimension: {
              label: "Dimension",
              type: "string",
              expression: "always",
              expressionType: "dimension",
              ref: "cube2props.dimension"
            },
            measure: {
              label: "Measure",
              type: "string",
              expression: "always",
              expressionType: "measure",
              ref: "cube2props.measure"
            }
          }
        }
      }
    },
    controller: ['$scope', '$element', function ( $scope, $element ) {
      //Set cube1
      $scope.$watchCollection("layout.cube1props", function(props) {
        $scope.backendApi.applyPatches([
          {
            "qPath": "/cube1/qHyperCubeDef/qDimensions",
            "qOp": "replace",
            "qValue": JSON.stringify([{qDef: {qFieldDefs: [props.dimension]}}])
          },
          {
            "qPath": "/cube1/qHyperCubeDef/qMeasures",
            "qOp": "replace",
            "qValue": JSON.stringify([{qDef: {qDef: props.measure}}])
          }
        ], false);
      });
      //Set cube2
      $scope.$watchCollection("layout.cube2props", function(props) {
        $scope.backendApi.applyPatches([
          {
            "qPath": "/cube2/qHyperCubeDef/qDimensions",
            "qOp": "replace",
            "qValue": JSON.stringify([{qDef: {qFieldDefs: [props.dimension]}}])
          },
          {
            "qPath": "/cube2/qHyperCubeDef/qMeasures",
            "qOp": "replace",
            "qValue": JSON.stringify([{qDef: {qDef: props.measure}}])
          }
        ], false);
      });
    }]
  };
});

