# Traveling Salesperson Problem -- Empirical Analysis

I notice that the plagarism test is not on this; however, I will still put my sources used for this. I had a lot of help from chatGPT with creating these graphs for the my implimentations of these algorithms. I also had help with the code that draws the graph that I have a couple pngs of. I also had help with the timing code because I didn't know a good timer in javascript.

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

I have attached the code and their respective images to the files above. What I
did was I created a bunch of graphs of different sizes and ran them over both of
my own tsp implimentations. I had it save the data and write it to a graph using
a graphing tool in javascript. By taking a look at these graphs we can clearly tell
that the HeldKarp takes far longer than the LocalSearch method. The runtimes get drastically
long using HeldKarp. I tried to get a runtime of an hour, however, I ran out of memory
before that could happen and my program crashed. I was able to make it to an input size
of 18 before that happened though.

The reason that the HeldKarp tour length should always be less than the LocalSearch is
because the LocalSearch is just an approximation of the shortest path. This means
that LocalSearch might not always give us the exact shortest path which means it will
always give a path that is greater than or equal to HeldKarp. It obviously cannot provide
a shorter path because HeldKarp provides the shortest path 100% of the time.
