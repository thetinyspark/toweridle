
import { Grid2D } from "../../../lib/common/model/space/partitioning/grid";
import Fighter from "../../../lib/core/model/schema/Fighter";
import Utils from "../../../lib/core/utils/Utils";
import { ENNEMIES, PLAYGROUND } from "../../mock.spec";

describe("Utils test suite", () => {
  it("should be able to get grid elements around an origin with a certain radius", () => {
    // given
    const data = PLAYGROUND();
    const grid =  Grid2D.from(data);
  
    // when 
    const testBed = [
      {fromRow: 7, fromCol: 11, radius: 2, expectedNum: 24},
      {fromRow: 0, fromCol: 11, radius: 1, expectedNum: 5},
      {fromRow: 14, fromCol: 11, radius: 1, expectedNum: 5},
      {fromRow: 14, fromCol: 0, radius: 1, expectedNum: 3},
      {fromRow: 14, fromCol: 22, radius: 1, expectedNum: 3},
      {fromRow: 140, fromCol: 140, radius: 1, expectedNum: 0},
      {fromRow: -140, fromCol: -140, radius: 1, expectedNum: 0},
    ];

    testBed.forEach( 
      (bed)=>{
        const results = Utils.getInRadius(grid, bed.fromRow, bed.fromCol, bed.radius );
        expect(results.length).toEqual(bed.expectedNum);
      }

    );
  });

  it("should be able to get ennemies from a point inside a certain radius", () => {
    // given

    const ennemies = ENNEMIES(10,10);
  
    // when 
    const testBed = [
      {ennemies, fromRow: 5, fromCol: 0, radius: 1, expectedNum: 6},
      {ennemies, fromRow: 5, fromCol: 5, radius: 2, expectedNum: 25},
      {ennemies, fromRow: 5, fromCol: 5, radius: 1, expectedNum: 9},
      {ennemies, fromRow: 0, fromCol: 0, radius: 2, expectedNum: 9},
      {ennemies, fromRow: 0, fromCol: 0, radius: 1, expectedNum: 4},
      {ennemies, fromRow: 9, fromCol: 9, radius: 2, expectedNum: 9},
      {ennemies, fromRow: 9, fromCol: 9, radius: 1, expectedNum: 4},
      {ennemies, fromRow: 9, fromCol: 0, radius: 2, expectedNum: 9},
      {ennemies, fromRow: 9, fromCol: 0, radius: 1, expectedNum: 4},
      {ennemies, fromRow: 9, fromCol: 0, radius: 2, expectedNum: 9},
      {ennemies, fromRow: 9, fromCol: 0, radius: 1, expectedNum: 4},
    ];

    testBed.forEach( 
      (bed)=>{
        const results = Utils.getEnnemiesInRadius(bed.ennemies, bed.fromRow, bed.fromCol, bed.radius );
        expect(results.length).toEqual(bed.expectedNum);
      }
    );
  });

  it("should be able to get the closest ennemy from a point inside a range of ennemies", () => {
    // given

    const ennemies = ENNEMIES(10,10);
  
    // when 
    const testBed = [
      {ennemies, fromRow: 5, fromCol: 0},
      {ennemies, fromRow: 5, fromCol: 5},
      {ennemies, fromRow: 5, fromCol: 5}
    ];

    testBed.forEach( 
      (bed)=>{
        const result = Utils.getClosestEnemyIn(bed.ennemies, bed.fromRow, bed.fromCol);
        expect(result.row).toEqual(bed.fromRow);
        expect(result.col).toEqual(bed.fromCol);
      }
    );
  });
});
