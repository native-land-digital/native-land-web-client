// TypeScript compiler can't find types for turf, and declares the error below
// seems like the fix will be included in an update by TurfJS team
// see https://github.com/Turfjs/turf/issues/2307
declare module '@turf/bbox' {
  const bbox: BBox;
  export default bbox;
}