package longrun.flowwords.user;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsersRepository usersRepository;
    private final String NO_CHECK_URL = "/login";
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationProcessingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(NO_CHECK_URL)) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = jwtService.extractAccessToken(request).orElse(null);

        if (accessToken != null && jwtService.isTokenValid(accessToken)) {
            String email = jwtService.extractEmail(accessToken).orElse(null);

            if (email != null) {
                UserDetailsImpl userDetails = usersRepository.findByEmail(email)
                        .map(UserDetailsImpl::new)
                        .orElse(null);

                if (userDetails != null) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    logger.info("User authenticated: " + email);
                } else {
                    logger.error("User not found: " + email);
                }
            } else {
                logger.error("Invalid token: unable to extract email");
            }
        } else {
            logger.error("Invalid or missing token");
        }

        filterChain.doFilter(request, response);
    }
}
