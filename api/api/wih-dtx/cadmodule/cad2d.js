const isZero = (aValue) => {
  return Math.abs(aValue) < 0.00000000001;
}

const isTwoPointIsEqual = (aPoint1, aPoint2) => {
  return aPoint1.dX === aPoint2.dX && aPoint1.dY === aPoint2.dY
}

const nextPoint = (aCurrentPoint, aPointArrayLength) => {
  let aPointArrayHigh = aPointArrayLength - 1
  if (aCurrentPoint === aPointArrayHigh)
    return 0
  else
    return aCurrentPoint + 1;
}

const isLeftPoint = (aPoint, aLinePoints, lP) => {
  let rP = nextPoint(lP, aLinePoints.length)
  return ( ( aLinePoints[rP].dX - aLinePoints[lP].dX) * (aPoint.dY - aLinePoints[lP].dY )
         - ( aPoint.dX - aLinePoints[lP].dX) * (aLinePoints[rP].dY - aLinePoints[lP].dY ) )
}

const pointinpolygon_2Dwn = (aPoint, aPolygonPoints) => {
  let pointCount = aPolygonPoints.length - 1;
  let lP = pointCount;
  let wn = 0;

  for (let rP=0; rP<=pointCount; rP++){
    if (aPolygonPoints[lP].dY <= aPoint.dY){
      if(aPolygonPoints[rP].dY > aPoint.dY){
        if( isLeftPoint(aPoint, aPolygonPoints, lP) > 0 ) wn++
      }
    }else{
      if (aPolygonPoints[rP].dY <= aPoint.dY) {
        if (isLeftPoint(aPoint, aPolygonPoints, lP) < 0 ) wn-- 
      }
    }
    lP = rP
  }

  return wn !== 0;
}

const linePosition_2D = (aPoint1, aPoint2) => {
  if(aPoint1.dX === aPoint2.dX){
    return 'lpVertical'
  }else if(aPoint1.dY === aPoint2.dY){
    return 'lpHorizontal'
  }else{
    return 'lpDiagonal'
  }
}

const linePositionXYValue_2D = (aPoint1, aPoint2) => {
  if(aPoint1.dX === aPoint2.dX){
    return 'X'
  }else if(aPoint1.dY === aPoint2.dY){
    return 'Y'
  }else{
    return ''
  }
}

const checkCardinalDirection_2D = (aLinePosition, aPoint1, aPoint2) => {
  switch(aLinePosition){
    case 'lpHorizontal':
      if (aPoint1.dX > aPoint2.dX) {
        return 'cdPositiveX'
      }else{
        return 'cdNegativeX';
      }
      
    case 'lpVertical':
      if (aPoint1.dY > aPoint2.dY){
        return 'cdPositiveY' 
      }else{
        return 'cdNegativeY';
      }
    case 'lpDiagonal':
      return 'cdNone'
  }
}

const cardinalDirection_2D = (aPoint1, aPoint2) => {
  let vLinePosition = linePosition_2D(aPoint1, aPoint2);
  return checkCardinalDirection_2D(vLinePosition, aPoint1, aPoint2);
}

const centerPoint_2D = (aPoint1, aPoint2) => {
  let cp = {
    dX: (aPoint1.dX + aPoint2.dX) / 2,
    dY: (aPoint1.dY + aPoint2.dY) / 2
  }
  return cp;
}

const lineDistance_2D = (aPoint1, aPoint2) => {
  let dX = Math.abs(aPoint1.dX - aPoint2.dX);
  let dY = Math.abs(aPoint1.dY - aPoint2.dY);
  let dS = Math.pow(dX, 2) + Math.pow(dY, 2);

  if (dS > 0) {
    return Math.sqrt(dS);
  }else{
    return 0
  }
}

const lineDistanceInGrid_2D = (aPoint1, aPoint2) => {
  return lineDistance_2D(aPoint1, aPoint2) / 910;
}

const polyGonAreaInMillimeter_2D = (aPolygonPoints = []) => {
  if (aPolygonPoints.length < 3) return 0;
    
  let area = 0;
  let rP = 0;
  let lP = aPolygonPoints.length - 1;

  for (rP=0; rP<aPolygonPoints.length; rP++){
    let dX = aPolygonPoints[lP].dX + aPolygonPoints[rP].dX;
    let dY = aPolygonPoints[lP].dY - aPolygonPoints[rP].dY;
    area += ( dX * dY );
    lP = rP;
  }

  area = Math.abs(area / 2);
  return area / 1000;
}

const polyGonAreaInGrid_2D = (aPolygonPoints = []) => {
  return polyGonAreaInMillimeter_2D(aPolygonPoints) / 828.1;
}

const polyGonAreaInTsubo_2D = (aPolygonPoints = []) => {
  return polyGonAreaInMillimeter_2D(aPolygonPoints) / 3312.4;
}

const polyGonAreaInJou_2D = (aPolygonPoints = []) => {
  return polyGonAreaInMillimeter_2D(aPolygonPoints) / 1656.2;
}

const polyGonAreaInMeterSquared_2D = (aPolygonPoints = []) => {
  return polyGonAreaInMillimeter_2D(aPolygonPoints) / 1000;
}

const polygonPerimeterInMillimeter_2D = (aPolygonPoints = []) => {
  if (aPolygonPoints.length === 1) return 0

  let perimeter = 0;
  let rP = 0;
  let lP = aPolygonPoints.length - 1;

  for(rP=0; rP<aPolygonPoints.length; rP++){
    perimeter += lineDistance_2D(aPolygonPoints[rP], aPolygonPoints[lP]);
    lP = rP;
  }
  
  return perimeter
}

const polygonPerimeterInMeter_2D = (aPolygonPoints = []) => {
  return polygonPerimeterInMillimeter_2D(aPolygonPoints) / 1000;
}

const polygonPerimeterInGrid_2D = (aPolygonPoints = []) => {
  return polygonPerimeterInMillimeter_2D(aPolygonPoints) / 910;
}

const pointInCircle_2D = (aPoint, aCirclePoint, aRadius) => {
  if ( ( aPoint.dX - aCirclePoint.dX ) * ( aPoint.dX - aCirclePoint.dX ) +  
       ( aPoint.dY - aCirclePoint.dY ) * ( aPoint.dY - aCirclePoint.dY ) <= aRadius * aRadius ) {
    return true
  }else{
    return false;
  }
}

const isLineSegmentIntersect_2D = (aLine1Pt1, aLine1Pt2, aLine2Pt1, aLine2Pt2, considerCollinearOverlapAsIntersect = false) => {

  let r = aLine1Pt2.minus(aLine1Pt1);
  let s = aLine2Pt2.minus(aLine2Pt1);
  let v = aLine2Pt1.minus(aLine1Pt1);
  let w = aLine1Pt1.minus(aLine2Pt1);

  let rxs = r.cross(s);
  let qpxr = v.cross(r);

  if ( ( isZero(rxs) ) && ( isZero(qpxr) ) ){
    if (considerCollinearOverlapAsIntersect){
      if ( ( 0 < v.timesByPoint(r) ) && ( v.timesByPoint(r) <= r.timesByPoint(r) ) ||
           ( 0 < w.timesByPoint(s) ) && ( w.timesByPoint(s) <= s.timesByPoint(s) ) ) 
        return true
    }
  }

  if ( ( isZero(rxs) ) && ( !isZero(qpxr) ) ){
    return false
  } else if ( ( isZero(rxs) ) && ( isZero(qpxr) ) ){
    return false
  }

  let t = v.cross(s) / rxs;
  let u = v.cross(r) / rxs;
  
  if ( ( !isZero(rxs) ) && ( ( 0 <= t ) && ( t <= 1 ) ) && ( ( 0 <= u ) && ( u <= 1 ) ) )
    return true;
}

const pointLiesOnLine_2D = (aPoint, aFirstPt, aSecondPt) => {
  let dxc = aPoint.dX - aFirstPt.dX;
  let dyc = aPoint.dY - aFirstPt.dY;

  let dxl = aSecondPt.dX - aFirstPt.dX;
  let dyl = aSecondPt.dY - aFirstPt.dY;

  let cross = dxc * dyl - dyc * dxl;

  if (cross === 0 ) {
    if ( Math.abs(dxl) >= Math.abs(dyl) ){
      if (dxl > 0)
        return ( aFirstPt.dX <= aPoint.dX ) && ( aPoint.dX <= aSecondPt.dX )
      else
        return ( aSecondPt.dX <= aPoint.dX ) && ( aPoint.dX <= aFirstPt.dX );
    }else{
      if (dyl > 0)
        return ( aFirstPt.dY <= aPoint.dY ) && ( aPoint.dY <= aSecondPt.dY )
      else
        return ( aSecondPt.dY <= aPoint.dY ) && ( aPoint.dY <= aFirstPt.dY );
    }
  }else
    return false
}

const pointInPolygonEdge_2D = (aPoint, aPolygonPoints) => {
  
  let lP = aPolygonPoints.length - 1;
  let rP = 0;

  for (rP=0; rP<aPolygonPoints.length; rP++){
    let lies = pointLiesOnLine_2D(aPoint, aPolygonPoints[lP], aPolygonPoints[rP]);
    if (lies) return lies
    lP = rP 
  }
  return false
}

module.exports = {
  nextPoint,
  pointinpolygon_2Dwn,
  linePosition_2D,
  checkCardinalDirection_2D,
  cardinalDirection_2D,
  centerPoint_2D,
  lineDistance_2D,
  lineDistanceInGrid_2D,
  linePositionXYValue_2D,
  polyGonAreaInMillimeter_2D,
  polyGonAreaInGrid_2D,
  polyGonAreaInTsubo_2D,
  polyGonAreaInJou_2D,
  polyGonAreaInMeterSquared_2D,
  polygonPerimeterInMillimeter_2D,
  polygonPerimeterInMeter_2D,
  polygonPerimeterInGrid_2D,
  pointInCircle_2D,
  isLineSegmentIntersect_2D,
  pointLiesOnLine_2D,
  pointInPolygonEdge_2D,
  isTwoPointIsEqual
}