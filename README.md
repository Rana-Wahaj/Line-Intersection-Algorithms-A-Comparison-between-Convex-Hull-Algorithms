# Line-Intersection-Algorithms-A-Comparison-between-Convex-Hull-Algorithms

Abstract—This paper explores the implementation and performance
evaluation of convex hull algorithms and line segment intersection
methods in computational geometry. The ’Sweep Line’
algorithm, an approach for identifying intersections between
line segments, is explained. The studied convex hull algorithms
include classical methods such as Brute Force, Graham Scan,
Jarvis March, Point Elimination, and Quick Hull. Implemented
in Python, each algorithm is assessed for execution times,
aiming to quantify their computational efficiency in delineating
convex hulls from random point sets. Through a comparative
analysis of execution times, this study provides insights into the
computational efficiencies of these algorithms, contributing to
computational geometry knowledge.
I. INTRODUCTION
The Brute Force convex hull algorithm determines the convex
hull by checking all point combinations but is less suitable
for large datasets due to scalability issues (time complexity:
O(n3)).
The Graham Scan algorithm efficiently computes the convex
hull using angular sorting with a time complexity of
O(n log n).
Jarvis March, or the Gift Wrapping algorithm, iteratively
adds points with the smallest polar angles and has a time
complexity of O(nh).
The Quick Hull algorithm combines divide-and-conquer and
incremental techniques with an average-case time complexity
of O(n log n) but may degrade to O(n2) in the worst case.
The counter-clockwise line intersection algorithm assesses
the orientation of three points to efficiently detect intersections
between line segments in computational geometry applications.

II. PROGRAMMING DESIGN
# Convex Hull Algorithms
For both the implementations Python programming language
is used. To plot the results of the algorithms, a famous
Python plotting package ”Matplotlib” is used. An iterative
approach has been taken for the implementation of all the
algorithms except the Quick Hull algorithm, which is recursive
in nature. Following is a quick overview of all the algorithms
part of this paper:
# Brute Force: This approach is not an algorithm but rather
a trial-and-error approach to solving the convex hull problem.
A random point is selected from the given set of points, and
then by comparison with every other point in the set, it is
determined whether the selected point should be part of the
hull or not. Complexity of this algorithm is O(N3)2)

#Jarvis March: This approach helps deselect the points
by starting with the smallest y-coordinate point and checks
for the next point having a counter-clockwise angle with the
previous point. The final result gives the set of points that
should be part of the hull. Complexity of this algorithm is
O(Nh)

#3) Graham Scan: Similar to Jarvis March, this approach
also takes the smallest y-coordinate point as the first point and
then points having counter-clockwise angles to the previous
point are included in the hull. The only difference is that points
not having a counter-clockwise angle are removed from the
set as the iterations proceed. Complexity of this algorithm is
O(Nlog(N))

#4) Point Elimination (Quick Elimination): This algorithm is
very different from the approaches discussed above.It takes the
route of eliminating the non-hull points first and then finding
the hull on the remaining points. The algorithm begins by
forming a quadrilateral with extreme points of both coordinates.
Points inside the quadrilateral are removed from the
set of points. Afterwards, the ray scatter algorithm is used to
remove points inside the quadrilateral. After the removal of
points, any other convex hull algorithm can be used to find
the final hull. Complexity of this algorithm is O(Nlog(N))

#5) Quick Hull: This algorithms is recursive in nature and
works similar to quick sort.The algorithm starts with selecting
the farthest x-coordinates on left and right in the given set
of points. This divides the set of points into two parts.
A line segment formed between them.Then farthest point
from that line segment is included in the hull-set.These three
points create a temporary hull and points inside of it are
removed. The above process is then repeated for all the line
segements recursively to for the complete hull. Complexity of
this algorithms is O(Nlog(N))

#B. Line Intersection Algorithms
#Counter-Clockwise Technique: The initial method employed
involves determining the intersection between line
segments through an assessment of their counterclockwise area
from each point of one segment to the other.
#Using Slopes: An additional method applied in this
project involves determining intersections between line segments
by evaluating their respective slopes. If the slopes of
the two lines differ, an intersection is identified; otherwise,
they are deemed non-intersecting.
# Using Parametric Equations: This technique involves
solving parametric equations of the line segments and if the
results lie between 0 and 1, intersection is identified; otherwise
not.
