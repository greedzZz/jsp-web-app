package servlets;

import utils.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long start = System.nanoTime();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String currentTime = formatter.format(date);
        if (validateData(req.getParameter("x"), req.getParameter("y"), req.getParameter("r"))) {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));
            boolean hitFact = checkHit(x, y, r);
            String executionTime = String.format("%.6f" ,(System.nanoTime() - start) * 10e-9).replace(",", ".");
            Result result = new Result(x, y, r, currentTime, executionTime, hitFact);
            ArrayList<Result> results;
            if (getServletContext().getAttribute("results") != null) {
                results = (ArrayList<Result>) getServletContext().getAttribute("results");
            } else results = new ArrayList<>();
            results.add(result);
            getServletContext().setAttribute("results", results);
        }
        getServletContext().getRequestDispatcher("/table.jsp").forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/error.jsp").forward(req, resp);
    }

    private boolean validateX(String x) {
        try {
            double xNum = Double.parseDouble(x);
            return xNum > -5 && xNum < 3;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateY(String y) {
        try {
            double yNum = Double.parseDouble(y);
            return yNum >= -4 && yNum <= 4;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateR(String r) {
        String[] values = {"1", "1.5", "2", "2.5", "3"};
        for (String value : values) {
            if (r.equals(value)) {
                return true;
            }
        }
        return false;
    }

    private boolean validateData(String x, String y, String r) {
        return validateX(x) && validateY(y) && validateR(r);
    }

    private boolean checkCircle(double x, double y, double r) {
        return x >= 0 && y >= 0 && Math.sqrt(x * x + y * y) <= r / 2;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= x - r;
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x >= -r && y <= r;
    }

    private boolean checkHit(double x, double y, double r) {
        return checkCircle(x, y, r) || checkTriangle(x, y, r) || checkRectangle(x, y, r);
    }

}
