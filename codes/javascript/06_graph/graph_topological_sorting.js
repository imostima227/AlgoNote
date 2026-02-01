// 课程表
const canFinish = function(numCourses, prerequisites) {
    const n = numCourses;
    const graph = {};
    const indegrees = Array(n).fill(0);

    // 初始化图
    for (let i = 0; i < n; i ++) {
        graph[i] = [];
    }

    for (const [course, pre] of prerequisites) {
        graph[pre].push(course);
        indegrees[course] ++;
    }

    const topologicalSortKahn = function(graph) {
        const S = []; // 保存入度为0的节点
        let cnt = 0;

        for (let i = 0; i < n; i ++) {
            if (indegrees[i] === 0) {
                S.push(i);
            }
        }
        
        while (S.length) {
            const u = S.shift();
            cnt ++;
            for(const v of graph[u]) {
                indegrees[v] --;
                if (!indegrees[v]) {
                    S.push(v);
                }
            }
        }

        return cnt === n;
    }

    return topologicalSortKahn(graph);
};