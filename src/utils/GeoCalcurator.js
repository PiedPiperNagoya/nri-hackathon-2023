export default {
  geoCalc(geo1, geo2) {
    const R = 6371e3 // 地球の半径（メートル）
    const phi1 = this.toRadians(geo1.latitude)
    const phi2 = this.toRadians(geo2.latitude)
    const deltaPhi = this.toRadians(geo2.latitude - geo1.latitude)
    const deltaLambda = this.toRadians(geo2.longitude - geo2.longitude)

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const direct = R * c // 結果はメートル単位

    // 直線距離を二等辺三角形の斜辺として残りの辺の長さを求める
    const distance = direct / Math.sqrt(2) * 2
    return distance
  },
  disToDur(distance) {
    // 時速4.7km ≒ 分速78mとする
    const walkSpeed = 78

    // キャリブレーション
    const cab = 1.1

    // 移動にかかる分数を返す
    return Math.ceil(distance / walkSpeed * cab)
  },
  toRadians(degrees) {
    return degrees * Math.PI / 180
  }
}