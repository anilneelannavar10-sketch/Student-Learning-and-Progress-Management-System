import java.sql.*;
import java.util.*;

/** Data access layer: JDBC calls for the Student Learning and Progress Management System. */
public class StudentDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/student_progress";
    private static final String USER = "root";
    private static final String PASS = "your_password";

    private Connection conn() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }

    // CREATE: add a student profile
    public void addStudent(String id, String name, String cls, String email) throws SQLException {
        String sql = "INSERT INTO students VALUES (?,?,?,?)";
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, id); ps.setString(2, name); ps.setString(3, cls); ps.setString(4, email);
            ps.executeUpdate();
        }
    }

    // UPDATE: edit student details
    public int updateStudent(String id, String name, String cls, String email) throws SQLException {
        String sql = "UPDATE students SET full_name=?, class_name=?, email=? WHERE student_id=?";
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, name); ps.setString(2, cls); ps.setString(3, email); ps.setString(4, id);
            return ps.executeUpdate();
        }
    }

    // SEARCH: by name, ID or class
    public List<String> search(String keyword) throws SQLException {
        String sql = "SELECT student_id, full_name, class_name FROM students "
                   + "WHERE full_name LIKE ? OR student_id LIKE ? OR class_name LIKE ?";
        List<String> out = new ArrayList<>();
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement(sql)) {
            String k = "%" + keyword + "%";
            ps.setString(1, k); ps.setString(2, k); ps.setString(3, k);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next())
                    out.add(rs.getString(1) + " | " + rs.getString(2) + " | " + rs.getString(3));
            }
        }
        return out;
    }

    // Store an assessment record
    public void addAssessment(String sid, String subject, String test, double score) throws SQLException {
        String sql = "INSERT INTO assessments (student_id,subject,test_name,score,test_date) VALUES (?,?,?,?,CURDATE())";
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, sid); ps.setString(2, subject); ps.setString(3, test); ps.setDouble(4, score);
            ps.executeUpdate();
        }
    }

    // Track progress: average score of one student
    public double averageScore(String sid) throws SQLException {
        String sql = "SELECT COALESCE(AVG(score),0) FROM assessments WHERE student_id=?";
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, sid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return rs.getDouble(1); }
        }
    }

    // DELETE
    public int deleteStudent(String id) throws SQLException {
        try (Connection c = conn(); PreparedStatement ps = c.prepareStatement("DELETE FROM students WHERE student_id=?")) {
            ps.setString(1, id);
            return ps.executeUpdate();
        }
    }

    public static void main(String[] args) throws Exception {
        StudentDAO dao = new StudentDAO();
        dao.addStudent("S103", "Rohan Gupta", "10-B", "rohan@school.in");
        dao.addAssessment("S103", "Maths", "Unit Test 1", 84);
        System.out.println("Average: " + dao.averageScore("S103"));
        dao.search("Rohan").forEach(System.out::println);
    }
}
