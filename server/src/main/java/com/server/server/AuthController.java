    package com.server.server;

    import com.server.server.dtos.users.UserDTO;
    import com.server.server.dtos.users.UserLoginDTO;
    import com.server.server.dtos.users.UserMapper;
    import com.server.server.security.CustomUserDetails;  // import your CustomUserDetails here
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.servlet.http.HttpSession;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.*;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.AuthenticationException;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.context.SecurityContextImpl;
    import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/auth")
    @RequiredArgsConstructor
    public class AuthController {

        private final AuthenticationManager authenticationManager;
        private final UserMapper userMapper;

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody UserLoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
            try {
                Authentication auth = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
                );

                // Set Authentication in SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(auth);

                // Persist authentication in session using HttpSessionSecurityContextRepository
                SecurityContextImpl securityContext = new SecurityContextImpl(auth);
                HttpSessionSecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
                securityContextRepository.saveContext(securityContext, request, response);

                // Access the session and return login response
                var session = request.getSession(true);
                CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();

                System.out.println("CURRENT USER: " + auth.getName());
                System.out.println("AUTHORITIES: " + auth.getAuthorities());
                System.out.println("Is Authenticated: " + auth.isAuthenticated());

                return ResponseEntity.ok(new LoginResponse(
                        userDetails.getUsername(),
                        session.getId(),
                        "Login successful"
                ));
            } catch (AuthenticationException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("Invalid username or password"));
            }
        }

        record LoginResponse(String username, String sessionId, String message) {}
        record ErrorResponse(String error) {}


        @PostMapping("/userdetails")
        public ResponseEntity<?> getUserDetails(HttpServletRequest request) {
            HttpSession session = request.getSession(false);
            if (session == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No session found");
            }

            CustomUserDetails principal = (CustomUserDetails) session.getAttribute("userDetails");
            if (principal == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Not authenticated");
            }

            // Map the JPA User to your DTO
            UserDTO dto = userMapper.toUserDTO(principal.getUser());
            return ResponseEntity.ok(dto);
        }





        @PostMapping("/logout")
        public ResponseEntity<?> logout(HttpServletRequest request) {
            request.getSession().invalidate();
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logged out successfully");
        }
    }
