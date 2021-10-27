<%@ page import="java.util.ArrayList" %>
<%@ page import="utils.Result" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description"
          content="Web-programming lab work #2. ITMO University. Faculty of Software Engineering and Computer Systems.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Gazizov Anvar">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
    <title>Web lab2</title>
</head>
<body>
<header>
    <span>Gazizov Anvar, P3233</span>
    <span id="variant">#33498</span>
</header>
<%
    ArrayList<Result> results = new ArrayList<>();
    if (request.getServletContext().getAttribute("results") != null) {
        results = (ArrayList<Result>) request.getServletContext().getAttribute("results");
    }
%>
<div class="table">
    <table>
        <thead>
        <tr>
            <th class="coords-column">X</th>
            <th class="coords-column">Y</th>
            <th class="coords-column">R</th>
            <th class="time-column">Current time</th>
            <th class="time-column">Execution time</th>
            <th>Hit fact</th>
        </tr>
        </thead>
        <%
            for (Result result : results) {
        %>
        <tr>
            <td><%=result.getX()%>
            </td>
            <td><%=result.getY()%>
            </td>
            <td><%=result.getR()%>
            </td>
            <td><%=result.getCurrentTime()%>
            </td>
            <td><%=result.getExecutionTime()%>
            </td>
            <td><%=result.getHitFact()%>
            </td>
        </tr>
        <%
            }
        %>
    </table>
</div>
<div class="plane">
    <svg width="386" height="386">
        <rect width="386" height="386" style="fill: white; stroke: black; stroke-width: 8px"></rect>

        <line x1="193" y1="0" x2="193" y2="386" style="stroke: black; stroke-width: 3px"></line>
        <line x1="0" y1="193" x2="386" y2="193" style="stroke: black; stroke-width: 3px"></line>
        <polygon points="383 193 367 183 367 203" style="fill: black"></polygon>
        <polygon points="193 3 183 20 203 20" style="fill: black"></polygon>

        <line x1="263" y1="198" x2="263" y2="188" style="stroke: black; stroke-width: 2px"></line>
        <line x1="333" y1="198" x2="333" y2="188" style="stroke: black; stroke-width: 2px"></line>
        <line x1="123" y1="198" x2="123" y2="188" style="stroke: black; stroke-width: 2px"></line>
        <line x1="53" y1="198" x2="53" y2="188" style="stroke: black; stroke-width: 2px"></line>
        <line x1="198" y1="263" x2="188" y2="263" style="stroke: black; stroke-width: 2px"></line>
        <line x1="198" y1="333" x2="188" y2="333" style="stroke: black; stroke-width: 2px"></line>
        <line x1="198" y1="123" x2="188" y2="123" style="stroke: black; stroke-width: 2px"></line>
        <line x1="198" y1="53" x2="188" y2="53" style="stroke: black; stroke-width: 2px"></line>

        <text class="axis" x="367" y="177">X</text>
        <text class="axis" x="204" y="19">Y</text>
        <text x="204" y="58">R</text>
        <text x="204" y="128">R/2</text>
        <text x="204" y="268">-R/2</text>
        <text x="204" y="338">-R</text>
        <text x="328" y="177">R</text>
        <text x="250" y="177">R/2</text>
        <text x="105" y="177">-R/2</text>
        <text x="42" y="177">-R</text>

        <rect class="shape" x="53" y="53" width="140" height="140"></rect>
        <polygon class="shape" points="193 193 333 193 193 333"></polygon>
        <path class="shape" d="M 193 123 A 70 70 0 0 1 263 193 L 193 193 Z"></path>
    </svg>
</div>
<div class="form">
    <form method="post">
        <br>
        <br>
        <div>
            <label>X value:</label>
            <label><input type="text" size="38" maxlength="7" name="x-value"
                          placeholder="X ∈ ( -5 ; 3 )"></label>
        </div>
        <br>
        <div>
            <label>Y value:</label>
            <label class="radio-block"><input type="radio" name="y-value" value="-4">-4</label>
            <label class="radio-block"><input type="radio" name="y-value" value="-3">-3</label>
            <label class="radio-block"><input type="radio" name="y-value" value="-2">-2</label>
            <label class="radio-block"><input type="radio" name="y-value" value="-1">-1</label>
            <label class="radio-block"><input type="radio" name="y-value" value="0">0</label>
            <label class="radio-block"><input type="radio" name="y-value" value="1">1</label>
            <label class="radio-block"><input type="radio" name="y-value" value="2">2</label>
            <label class="radio-block"><input type="radio" name="y-value" value="3">3</label>
            <label class="radio-block"><input type="radio" name="y-value" value="4">4</label>
        </div>
        <br>
        <div id="r-buttons">
            <label>R value:</label>
            <button type="button" name="r-value" value="1">1</button>
            <button type="button" name="r-value" value="1.5">1.5</button>
            <button type="button" name="r-value" value="2">2</button>
            <button type="button" name="r-value" value="2.5">2.5</button>
            <button type="button" name="r-value" value="3">3</button>
        </div>
        <br>
        <div class="main-buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </div>
    </form>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="main.js"></script>
</body>
</html>